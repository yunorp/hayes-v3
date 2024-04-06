import { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';


type SheetForm = {
  custumizador: string;
  tipo: number;
  quantidade: number;
  QTDlockpick: number;
  QTDflipper: number;
  QTDkm: number;
  QTDchave: number;
  QTDalicate: number;
  QTDkit: number;
  QTDoleo: number;
  QTDbateria: number;
  QTDpneu: number;
  ReparoFora: number;
  QTDcinto: number;
  valorEmpresa: number;
  valorMaoDeObra: number;
  result: number;
  role: string;
  apenasReparo: boolean;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const body = req.body as SheetForm;

    try {
      // preparar auth
      const auth = new google.auth.GoogleAuth({
        credentials: {
          client_email: process.env.GOOGLE_CLIENT_EMAIL || '',
          private_key: (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
        },
        scopes: [
          'https://www.googleapis.com/auth/drive',
          'https://www.googleapis.com/auth/drive.file',
          'https://www.googleapis.com/auth/spreadsheets',
        ],
      });

      const sheets = google.sheets({
        auth,
        version: 'v4',
      });

      // Verificar se a aba (sheet) já existe
      const sheetExists = await doesSheetExist(sheets, '1zfIMBS8sFVkIBSjalex2sk-1sl-g2vqvkZvcNVEnMyQ',body.custumizador);
      if (!sheetExists) {
        // Se a aba não existir, criar uma nova
        return res.status(400).json({ error: 'A aba não existe. Por favor, crie uma nova aba.' });
      }


      // Adicionar os dados à planilha
      const response = await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: `${body.custumizador}!A1:J1`,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [
            [
              body.custumizador,
              `=IFS(${body.apenasReparo}=TRUE;"SIM";${body.apenasReparo}=FALSE;"NÃO")`,
              `=IFS(${body.tipo}=0;"Nenhuma";${body.tipo}=700;"S";${body.tipo}=1700;"S";${body.tipo}=600;"A";${body.tipo}=1500;"A";${body.tipo}=500;"B";${body.tipo}=1300;"B";${body.tipo}=400;"C";${body.tipo}=1100;"C";${body.tipo}=250;"D";${body.tipo}=900;"D";${body.tipo}=650;"M";${body.tipo}=1000;"M")`,
              body.quantidade,
              body.QTDlockpick,
              body.QTDflipper,
              `=IFS(${body.QTDkm} = 0;"Não Teve"; ${body.QTDkm} = 500;"Sul"; ${body.QTDkm} = 700;"Sandy Shores"; ${body.QTDkm} = 1000;"Paleto")`,
              body.QTDchave,
              body.QTDalicate,
              body.QTDkit,
              body.QTDoleo,
              body.QTDbateria,
              body.QTDpneu,
              body.ReparoFora,
              body.QTDcinto,
              body.result,
              body.valorMaoDeObra,
              body.role,
            ],
          ],
        },
      });

      console.log('Resposta da API:', response.data);

      // Realize a lógica de processamento do formulário, como salvar os dados em um banco de dados
      // Simule uma resposta bem-sucedida
      res.status(200).json({ message: 'Formulário enviado com sucesso', data: response.data });

    } catch (error) {
      // Em caso de erro, envie uma resposta de erro
      console.error('Erro na API:', error);
      res.status(500).json({ error: 'Erro no servidor' });
    }
  } else {
    // Se a solicitação não for do tipo POST, retorne um erro de método não permitido
    res.status(405).json({ error: 'Método não permitido' });
  }
}

// Função para verificar se a aba já existe
async function doesSheetExist(sheets: any, spreadsheetId: string, sheetName: string): Promise<boolean> {
  try {
    const response = await sheets.spreadsheets.get({
      spreadsheetId,
      ranges: [sheetName],
    });

    // Se a resposta não tiver erro, a aba existe
    return true;
  } catch (error) {
    // Se a resposta tiver erro, a aba não existe
    return false;
  }
}

// Função para criar uma nova aba
async function createSheet(sheets: any, spreadsheetId: string, sheetName: string) {
  await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: {
      requests: [
        {
          addSheet: {
            properties: {
              title: sheetName,
            },
          },
        },
      ],
    },
  });
}
