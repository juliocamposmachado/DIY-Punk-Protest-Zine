export interface Manifesto {
  id: string;
  titulo: string;
  conteudo: string;
  autor: string;
  created_at: number;
  approved: boolean;
}

interface DatabaseRecord {
  id: string;
  data: Manifesto;
  created_at: number;
  updated_at: number;
  metadata: Record<string, string>;
}

interface IndexEntry {
  paste_id: string;
  created_at: number;
  updated_at: number;
  metadata: Record<string, string>;
}

interface DatabaseIndex {
  [key: string]: IndexEntry;
}

class DPasteDatabase {
  private baseUrl = 'https://dpaste.com';
  private indexId: string | null = null;
  private index: DatabaseIndex = {};

  private async makeRequest(endpoint: string, options?: RequestInit): Promise<any> {
    const url = `${this.baseUrl}${endpoint}`;

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...options?.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        return await response.json();
      }

      return { content: await response.text() };
    } catch (error) {
      console.error('Erro na requisição:', error);
      throw error;
    }
  }

  async loadIndex(): Promise<void> {
    const storedIndexId = localStorage.getItem('dpaste_index_id');

    if (storedIndexId) {
      this.indexId = storedIndexId;
      try {
        const response = await this.makeRequest(`/${storedIndexId}.txt`);
        this.index = JSON.parse(response.content);
      } catch (error) {
        console.error('Erro ao carregar índice:', error);
        this.index = {};
      }
    }
  }

  async saveIndex(): Promise<void> {
    const indexContent = JSON.stringify(this.index, null, 2);
    const params = new URLSearchParams();
    params.append('content', indexContent);
    params.append('syntax', 'json');
    params.append('expiry_days', '365');

    try {
      const response = await fetch(`${this.baseUrl}/api/v2/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const resultUrl = await response.text();

      if (resultUrl) {
        const pasteId = resultUrl.trim().split('/').filter(Boolean).pop();
        this.indexId = pasteId;
        localStorage.setItem('dpaste_index_id', pasteId);
      }
    } catch (error) {
      console.error('Erro ao salvar índice:', error);
      throw error;
    }
  }

  async create(key: string, data: Manifesto): Promise<string> {
    if (!this.indexId) {
      await this.loadIndex();
    }

    if (this.index[key]) {
      throw new Error(`Chave '${key}' já existe no banco de dados`);
    }

    const record: DatabaseRecord = {
      id: '',
      data,
      created_at: Date.now(),
      updated_at: Date.now(),
      metadata: {},
    };

    const recordContent = JSON.stringify(record, null, 2);
    const params = new URLSearchParams();
    params.append('content', recordContent);
    params.append('syntax', 'json');
    params.append('expiry_days', '365');

    try {
      const response = await fetch(`${this.baseUrl}/api/v2/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const resultUrl = await response.text();

      if (resultUrl) {
        const pasteId = resultUrl.trim().split('/').filter(Boolean).pop();
        record.id = pasteId;

        this.index[key] = {
          paste_id: pasteId,
          created_at: record.created_at,
          updated_at: record.updated_at,
          metadata: record.metadata,
        };

        await this.saveIndex();
        return pasteId;
      }

      throw new Error('Erro ao criar registro');
    } catch (error) {
      console.error('Erro ao criar:', error);
      throw error;
    }
  }

  async read(key: string): Promise<Manifesto | null> {
    if (!this.indexId) {
      await this.loadIndex();
    }

    if (!this.index[key]) {
      return null;
    }

    const pasteId = this.index[key].paste_id;

    try {
      const response = await this.makeRequest(`/${pasteId}.txt`);
      const record: DatabaseRecord = JSON.parse(response.content);
      return record.data;
    } catch (error) {
      console.error('Erro ao ler:', error);
      return null;
    }
  }

  async listAll(): Promise<Manifesto[]> {
    if (!this.indexId) {
      await this.loadIndex();
    }

    const manifestos: Manifesto[] = [];

    for (const key of Object.keys(this.index)) {
      try {
        const manifesto = await this.read(key);
        if (manifesto && manifesto.approved) {
          manifestos.push(manifesto);
        }
      } catch (error) {
        console.error(`Erro ao ler manifesto ${key}:`, error);
      }
    }

    return manifestos.sort((a, b) => b.created_at - a.created_at);
  }

  generateKey(titulo: string): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    const hash = titulo.substring(0, 20).replace(/[^a-zA-Z0-9]/g, '_');
    return `${hash}_${timestamp}_${random}`;
  }
}

export const db = new DPasteDatabase();
