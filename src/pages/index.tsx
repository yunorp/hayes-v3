"use client"
import styles from './index.module.css';
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha,styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import { purple,yellow,green,blue } from '@mui/material/colors';
import { NextApiResponse } from 'next';
import Head from 'next/head'

export default function Home() {

  

  const [value1, setValue1] = React.useState<number>(0);
  const [value2, setValue2] = React.useState<number>(0);
  const [QTDlockpick, setQTDlockpick] = React.useState<number>(0);
  const [QTDflipper, setQTDflipper] = React.useState<number>(0);
  const [QTDferramenta, setQTDferramenta] = React.useState<number>(0);
  const [QTDkm, setQTDkm] = React.useState<number>(0);

  
  //const [result, setResult] = React.useState<number>(0);

  const isFormValid = () => {
    return (
      formData.custumizador &&
      formData.valorMaoDeObra &&
      formData.result
    );
  };
 

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    // Verifica se o campo deve ser tratado como número
    const updatedValue = ['tipo', 'quantidade', 'result', 'QTDlockpick', 'QTDflipper', 'QTDferramenta', 'QTDkm'].includes(name)
      ? parseFloat(value)
      : value;
  
    setFormData((prevData) => ({ ...prevData, [name]: updatedValue }));
  };
  
  // Movendo os cálculos para dentro da função updateValores
  const result1 = value1 * value2;
  const result2 = QTDlockpick * 600 + QTDflipper * 1500 + QTDferramenta * 300 + QTDkm * 90;
  const result = result1 + result2;
  const valorAprendiz = result * 0.40;
  const valorMaquinaAprendiz = result - valorAprendiz;
  const valorMaoAprendiz = result - valorMaquinaAprendiz;



  console.log('Debug updateValores:');
  console.log('QTDlockpick:', QTDlockpick);
  console.log('QTDflipper:', QTDflipper);
  console.log('QTDferramenta:', QTDferramenta);
  console.log('QTDkm:', QTDkm);
  console.log('result:', result);
  console.log('valorAprendiz:', valorAprendiz);
  console.log('valorMaquinaAprendiz:', valorMaquinaAprendiz);
  console.log('valorMaoAprendiz:', valorMaoAprendiz);

  const [vendedor, setVendedor] = React.useState('');
  const [cliente, setCliente] = React.useState('');


  const [formData, setFormData] = React.useState({
    custumizador: '',
    tipo: 0,
    quantidade: 0,
    QTDlockpick: 0,
    QTDflipper: 0,
    QTDferramenta: 0,
    QTDkm: 0,
    valorEmpresa: 0,
    valorMaoDeObra: 0,
    result: 0,
    role: 'Mecânico'
    
  });

  console.log({formData})
  const handleVendedorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVendedor(e.target.value);
  };

  const handleNumero2Change = (e: SelectChangeEvent) => {
    setValue2(Number(e.target.value));
  };
  
  const handleNumero1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue1(Number(e.target.value));
  };
  

  const handleQTDlockpickChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQTDlockpick(Number(e.target.value));
  };
  
  const handleQTDflipperChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQTDflipper(Number(e.target.value));
  };
  
  const handleQTDferramentaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQTDferramenta(Number(e.target.value));
  };
  
  const handleQTDkmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQTDkm(Number(e.target.value));
  };

  const updateValores = (tipo: number, quantidade: number) => {
    const result1 = value1 * value2;
    const result2 = QTDlockpick * 600 + QTDflipper * 1500 + QTDferramenta * 300 + QTDkm * 90;
    const result = result1 + result2;

    // Agora, valorMaoDeObra será 30% do result
    const valorMaoDeObra = result * 0.40;

    setFormData({
      ...formData,
      valorEmpresa: result - valorMaoDeObra, // Valor restante após subtrair valorMaoDeObra
      valorMaoDeObra: valorMaoDeObra,
      result: result,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result3 = formData.quantidade * formData.tipo;
  var result4=0;
  result4 = formData.QTDlockpick * 600 + formData.QTDflipper * 1500 + formData.QTDferramenta * 300 + formData.QTDkm * 90;
  const resultTotal = result3 + result4;
  const valorMaoDeObraAprendiz = resultTotal * 0.40;

  formData.custumizador = vendedor;
  formData.quantidade = value1;
  formData.tipo = value2;
  formData.QTDlockpick = QTDlockpick;
  formData.QTDferramenta = QTDferramenta;
  formData.QTDkm = QTDkm;
  formData.QTDflipper = QTDflipper;
  formData.result = resultTotal;
  formData.valorMaoDeObra = valorMaoDeObraAprendiz;
  formData.valorEmpresa = resultTotal - valorMaoDeObraAprendiz;
    
  
    // Remova as linhas que definem formData.result, formData.tipo e formData.quantidade aqui.
  
    const formDataValid = isFormValid();

    if (!formDataValid) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      setLoading(false);
      return;
    }
  
    try {
      const response = await fetch('/api/route', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 405) {
        console.error('Método não permitido. Verifique a configuração do servidor.');
        alert('Erro no servidor. Tente novamente mais tarde.');
        setError(true);
      } else if (response.ok) {
        const content = await response.json();
        console.log(content);
        alert('Pedido registrado com sucesso!!');
        setSuccess(true);

        setTimeout(function(){
          setSuccess(false)// you can pass true to reload function to ignore the client cache and reload from the server
      },2000);

      } else {
        // Se a resposta do servidor não for bem-sucedida, trata o erro
        const errorContent = await response.json();
        console.error('Erro na API:', errorContent);
        alert('Erro ao enviar o formulário. Verifique os dados e tente novamente.');
        setError(true);
        setTimeout(function(){
          setError(false)// you can pass true to reload function to ignore the client cache and reload from the server
      },2000);
      }
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error);
      alert('Erro ao enviar o formulário. Verifique a conexão e tente novamente.');
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  

  const result3 = formData.quantidade * formData.tipo;
  var result4=0;
  result4 = formData.QTDlockpick * 600 + formData.QTDflipper * 1500 + formData.QTDferramenta * 300 + formData.QTDkm * 90;
  const resultTotal = result3 + result4;
  const valorMaoDeObraAprendiz = resultTotal * 0.40;

  formData.custumizador = vendedor;
  formData.quantidade = value1;
  formData.tipo = value2;
  formData.QTDlockpick = QTDlockpick;
  formData.QTDferramenta = QTDferramenta;
  formData.QTDkm = QTDkm;
  formData.QTDflipper = QTDflipper;
  formData.result = resultTotal;
  formData.valorMaoDeObra = valorMaoDeObraAprendiz;
  formData.valorEmpresa = resultTotal - valorMaoDeObraAprendiz;

      // button loading submit

      const [loading, setLoading] = React.useState(false);
      const [success, setSuccess] = React.useState(false);
      const [error, setError] = React.useState(false);
      const timer = React.useRef<number>();

      const buttonSx = {
            ...(success && {
              bgcolor:  green[400],
              '&:hover': {
                bgcolor: green[400],
              },
            }),
          };

          React.useEffect(() => {
            return () => {
              clearTimeout(timer.current);
            };
          }, []);

          const handleButtonClick = (event: React.FormEvent) => {
            if (!loading) {
              setSuccess(false);
              setLoading(true);
              setError(false);
          
              handleSubmit(event); // Chama a submissão do formulário passando o evento
            }
          };
          // termina aqui 

      const [checked, setChecked] = React.useState(false);     
      const [myData, setMyData] = React.useState<number>(0);

      

  return (
      
      <main className={styles.main}>
      <Head>
        <title>Calculadora Hayes</title>
        <link rel="icon" href="/hayes.webp" />
      </Head>
        <div className={styles.containerBox}>
          <div className={styles.box1}>  
            <div className={styles.boxTitulo}>
              <h1>Calculadora Hayes  </h1>
            </div>
            <div className={styles.boxInputs1}>            
              <form className={styles.box2} onSubmit={handleSubmit}>
                <FormControl sx={{ m: 1, width: '20ch' }}>
                      <TextField
                          value={formData.custumizador}
                          onChange={handleVendedorChange}
                          id="filled-number"
                          label="Nome do Customizador"
                          name='custumizador'
                          type="text"
                          variant="standard"
                        />
                </FormControl>
                <FormControl variant='standard' sx={{ m: 1, width: '20ch' }}>
                  <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
                  <Select
                    type='number'
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    onChange={handleNumero2Change}
                    value={String(value2)}
                    name="tipo"
                    label="Age"
                    
                  >
                    <strong> CARRO </strong> 
                    <MenuItem value={275}>D</MenuItem>
                    <MenuItem value={325}>C</MenuItem>
                    <MenuItem value={375}>B</MenuItem>
                    <MenuItem value={425}>A</MenuItem>
                    <MenuItem value={475}>S</MenuItem>  
                    <strong> MOTO </strong>   
                    <MenuItem value={326}>M</MenuItem>       
                  </Select>
                </FormControl>
                <FormControl sx={{ m: 1, width: '20ch' }}>
                  <TextField
                      value={value1}
                      onChange={handleNumero1Change}
                      id="filled-number"
                      label="Quantidade"
                      name='quantidade'
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="standard"
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: '20ch' }}>
                  <TextField
                    value={QTDlockpick}
                    onChange={handleQTDlockpickChange}
                    id="filled-number"
                    label="QTD Lockpick"
                    name="QTDlockpick"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="standard"
                  />
                </FormControl>

                <FormControl sx={{ m: 1, width: '20ch' }}>
                  <TextField
                    value={QTDflipper}
                    onChange={handleQTDflipperChange}
                    id="filled-number"
                    label="QTD Flipper"
                    name="QTDflipper"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="standard"
                  />
                </FormControl>

                <FormControl sx={{ m: 1, width: '20ch' }}>
                  <TextField
                    value={QTDferramenta}
                    onChange={handleQTDferramentaChange}
                    id="filled-number"
                    label="QTD Ferramenta"
                    name="QTDferramenta"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="standard"
                  />
                </FormControl>

                <FormControl sx={{ m: 1, width: '20ch' }}>
                  <TextField
                    value={QTDkm}
                    onChange={handleQTDkmChange}
                    id="filled-number"
                    label="QTD Km"
                    name="QTDkm"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="standard"
                  />
                </FormControl>
                  <div className={styles.boxInputs2}>              
                    <input value={formData.result} type="hidden" name="result" id="" />
                    <input value={formData.quantidade} type="hidden" name="quantidade" id="" />
                    <input value={formData.tipo} type="hidden" name="tipo" id="" />
                    <input value={QTDlockpick} type="hidden" name="QTDlockpick" id="" />
                    <input value={QTDflipper} type="hidden" name="QTDflipper" id="" />
                    <input value={QTDferramenta} type="hidden" name="QTDferramenta" id="" />
                    <input value={QTDkm} type="hidden" name="QTDkm" id="" />
                  </div>   
                  <div className={styles.btnBox}>
                    <Button
                      variant="outlined"
                      sx={buttonSx}
                      type="submit"
                      disabled={loading}
                      onClick={handleButtonClick}
                    >
                      {loading ? 'Enviando...' : success ? 'Sucesso!' : error ? 'Falha ao Enviar' : 'Registrar Pedido'}
                    </Button>
                    {loading && (
                      <CircularProgress
                        size={24}
                        sx={{
                          color: blue[500],
                          position: 'relative',
                          bottom: '-5px',
                          right: '15%',
                          marginLeft: '-12px',
                        }}
                      />
                    )}    
                  </div>
              </form>
            </div>                                                     
          </div>
          <section className={styles.sectionTotal}>
              <div className={styles.boxTotal}>
                <div>
                  <h1>MECÂNICO</h1>
                  <h2>VALOR TOTAL</h2>
                </div> 
                <div>
                  <p>${result}</p>
                </div>
              </div>   
          </section>             
        </div>
        <footer className={styles.assinatura}>
          <p>© Feito por Ellyson Alves</p>
        </footer>
      </main>
  )
}
