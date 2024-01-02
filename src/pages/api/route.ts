import { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';

type SheetForm = {
  custumizador: string;
  Motor: number;
  Freio: number;
  Suspensao: number;
  Transmissao: number;
  Turbo: number;
  OilPump: number;
  DriveShaft: number;
  CylinderHead: number;
  BatteryCables: number;
  FuelTank : number;
  DriftTires: number;
  QTDdesconto: number;
  valorEmpresa: number;
  valorMaoDeObra: number;
  result: number;
  cargo: number;
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
      const sheetExists = await doesSheetExist(sheets, '10gX8HvkpjGkNUFyKENdAetO8WqsHO3ZJooFCusG9dec',body.custumizador);
      if (!sheetExists) {
        // Se a aba não existir, criar uma nova
        return res.status(400).json({ error: 'A aba não existe. Por favor, crie uma nova aba.' });
      }

      const getStatus = (value: number): string => {
        return value === 0 ? 'Não Teve' : value === 1 ? 'Teve' : 'Status Indefinido';
      };
      const getStatusDesconto = (value: number): string => {
        return value === 1 ? 'Não Teve' : value === 0.10 ? '10%' : value === 0.15 ? '15%' : value === 0.20 ? '20%' : value === 0.50 ? '50%' : 'Status Indefinido';
      };
      const motorStatus = getStatus(body.Motor);
      const freioStatus = getStatus(body.Freio);
      const suspensaoStatus = getStatus(body.Suspensao);
      const transmissaoStatus = getStatus(body.Transmissao);
      const turboStatus = getStatus(body.Turbo);
      const oilPumpStatus = getStatus(body.OilPump);
      const driveShaftStatus = getStatus(body.DriveShaft);
      const cylinderHeadStatus = getStatus(body.CylinderHead);
      const batteryCableStatus = getStatus(body.BatteryCables);
      const fuelTankStatus = getStatus(body.FuelTank);
      const driftTiresStatus = getStatus(body.DriftTires);
      const descontoStatus = getStatusDesconto(body.QTDdesconto);
      const valorEmpresaStatus = getStatus(body.valorEmpresa);
      const valorMaoDeObraStatus = getStatus(body.valorMaoDeObra);
      const resultStatus = getStatus(body.result);

      const values = [
        [
          body.custumizador,
          `
          Motor: ${motorStatus},
          Freio: ${freioStatus},
          Suspensão: ${suspensaoStatus},
          Transmissao: ${transmissaoStatus},
          Turbo: ${turboStatus},
          OilPump: ${oilPumpStatus},
          DriveShaft: ${driveShaftStatus},
          CylinderHead: ${cylinderHeadStatus},
          BatteryCable: ${batteryCableStatus},
          FuelTank: ${fuelTankStatus},
          DriftTires: ${driftTiresStatus},
          desconto: ${descontoStatus},
          `,
          body.valorEmpresa,
          body.valorMaoDeObra,
          body.result,
          `=IFS(${body.cargo}=0.13;"Aprendiz";${body.cargo}=0.17;"Mecânico";${body.cargo}=0.22;"Estoquista";${body.cargo}=0.30;"Gerente")`
        ],
      ];

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: `${body.custumizador}!A1:E1`, // Ajuste a quantidade de colunas conforme necessário
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: values,
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
