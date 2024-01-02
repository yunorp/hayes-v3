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
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import { purple,yellow,green,blue,red } from '@mui/material/colors';
import Head from 'next/head';
import { useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';

export default function Home() {

  const [Motor, setMotor] = React.useState<number>(0);
  const [Freio, setFreio] = React.useState<number>(0);
  const [Suspensao, setSuspensao] = React.useState<number>(0);
  const [Transmissao, setTransmissao] = React.useState<number>(0);
  const [Turbo, setTurbo] = React.useState<number>(0);
  const [OilPump, setOilPump] = React.useState<number>(0);
  const [DriveShaft, setDriveShaft] = React.useState<number>(0);
  const [CylinderHead, setCylinderHead] = React.useState<number>(0);
  const [BatteryCables, setBatteryCables] = React.useState<number>(0);
  const [FuelTank, setFuelTank] = React.useState<number>(0);
  const [DriftTires, setDriftTires] = React.useState<number>(0);
  const [QTDdesconto, setQTDdesconto] = React.useState<number>(1);
  const [cargo, setCargo] = React.useState<number>(0.17);
  
  //const [result, setResult] = React.useState<number>(0);
  interface CargoNomes {
    0.13: string;
    0.17: string;
    0.22: string;
    0.30: string;
    [key: number]: string; // Adicionando a assinatura de índice
  }
  
  const cargoNomes: CargoNomes = {
    0.13: "APRENDIZ",
    0.17: "MECÂNICO",
    0.22: "ESTOQUISTA",
    0.30: "GERENTE",
  };
  
  const cargoNome: string = cargoNomes[cargo] || "Outro Cargo";

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
    const updatedValue = ['Motor', 'Freio', 'Suspensao', 'Transmissao', 'Turbo', 'OilPump', 'DriveShaft', 'CylinderHead', 'BatteryCables','FuelTank','DriftTires'].includes(name)
      ? parseFloat(value)
      : value;
  
    setFormData((prevData) => ({ ...prevData, [name]: updatedValue }));
  };
  
  // Movendo os cálculos para dentro da função updateValores
  const result = Motor * 5000 + Freio * 6000 + Suspensao * 9000 + Transmissao * 8000  + Turbo * 10000 + OilPump * 2000 + DriveShaft * 4500 + CylinderHead * 3500 + BatteryCables * 1500 + FuelTank * 3000 + DriftTires * 2000;
  // valor com desconto aplicado
  const resultDesconto = result * QTDdesconto;
  const resultComDesconto = QTDdesconto === 1 ? result : result - result * QTDdesconto;
  const valorAprendiz = resultComDesconto * cargo;
  const valorMaquinaAprendiz = resultComDesconto - valorAprendiz;
  const valorMaoAprendiz = resultComDesconto - valorMaquinaAprendiz;

  
  

  console.log('Debug updateValores:');
  console.log('Motor:', Motor);
  console.log('Freio:', Freio);
  console.log('Transmissao:', Transmissao);
  console.log('result:', result);
  console.log('Desconto:', QTDdesconto);
  console.log('Result Com Desconto:', resultComDesconto);
  console.log('valorAprendiz:', valorAprendiz);
  console.log('valorMaquinaAprendiz:', valorMaquinaAprendiz);
  console.log('valorMaoAprendiz:', valorMaoAprendiz);

  const [vendedor, setVendedor] = React.useState('');
  const [cliente, setCliente] = React.useState('');

  const [formData, setFormData] = React.useState({
    custumizador: '',
    Motor: 0,
    Freio: 0,
    Suspensao: 0,
    Transmissao: 0,
    Turbo: 0,
    OilPump: 0,
    DriveShaft: 0,
    CylinderHead: 0,
    BatteryCables: 0,
    FuelTank: 0,
    DriftTires: 0,
    QTDdesconto: 1,
    valorEmpresa: 0,
    valorMaoDeObra: 0,
    result: 0,    
    cargo: 0.17,
  });

  

  console.log({formData})
  const handleVendedorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVendedor(e.target.value);
  };

  const handleMotorChange = (e: SelectChangeEvent) => {
    setMotor(Number(e.target.value));
  };
  
  const handleFreioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFreio(Number(e.target.value));
  };
  
  const handleSuspensaoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSuspensao(Number(e.target.value));
  };
  
  const handleTransmissaoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTransmissao(Number(e.target.value));
  };

  const handleTurboChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTurbo(Number(e.target.value));
  };
  const handleOilPumpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOilPump(Number(e.target.value));
  };

  const handleDriveShaftChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDriveShaft(Number(e.target.value));
  };

  const handleCylinderHeadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCylinderHead(Number(e.target.value));
  };

  const handleBatteryCablesChange = (e: SelectChangeEvent) => {
    setBatteryCables(Number(e.target.value));
  };

  const handleFuelTankChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFuelTank(Number(e.target.value));
  };

  const handleDriftTiresChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDriftTires(Number(e.target.value));
  };

  const handleQTDdescontoChange = (e: SelectChangeEvent) => {
    setQTDdesconto(Number(e.target.value));
  };

  const handleCargoChange = (e: SelectChangeEvent) => {
    setCargo(Number(e.target.value));
  }

  const updateValores = () => {
    const result =
    formData.Motor * 5000 +
    formData.Freio * 6000 +
    formData.Suspensao * 9000 +
    formData.Transmissao * 8000 +
    formData.Turbo * 10000 +
    formData.OilPump * 2000 +
    formData.DriveShaft * 4500 +
    formData.CylinderHead * 3500 +
    formData.BatteryCables * 1500 +
    formData.FuelTank * 3000 +
    formData.DriftTires * 2000;

    const resultDesconto = result * formData.QTDdesconto;
    const resultComDesconto = QTDdesconto === 1 ? result : result - result * QTDdesconto;
    const valorMaoDeObra = resultComDesconto * formData.cargo;
    
    

    setFormData({
      ...formData,
      valorEmpresa: resultComDesconto - valorMaoDeObra,
      valorMaoDeObra: valorMaoDeObra,
      result: result,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

  const resultTotal = formData.Motor * 5000 + formData.Freio * 6000 + formData.Suspensao * 9000 + formData.Transmissao * 8000  + formData.Turbo * 10000 + formData.OilPump * 2000 + formData.DriveShaft * 4500 + formData.CylinderHead * 3500 + formData.BatteryCables * 1500 + formData.FuelTank * 3000 + formData.DriftTires * 2000;
  // valor com desconto aplicado
  const resultDesconto1 = resultTotal * formData.QTDdesconto;
  const resultComDesconto1 = formData.QTDdesconto === 1 ? resultTotal : resultTotal - resultTotal * formData.QTDdesconto;
  const valorMaoDeObraAprendiz = resultComDesconto1 * formData.cargo;
  

  formData.custumizador = vendedor;
  formData.Motor = Motor;
  formData.Freio = Freio;
  formData.Suspensao = Suspensao;
  formData.Transmissao = Transmissao;
  formData.Turbo = Turbo;
  formData.OilPump= OilPump;
  formData.DriveShaft = DriveShaft;
  formData.CylinderHead = CylinderHead;
  formData.BatteryCables = BatteryCables;
  formData.FuelTank = FuelTank;
  formData.DriftTires = DriftTires;
  formData.QTDdesconto = QTDdesconto;
  formData.result = resultTotal;
  formData.valorMaoDeObra = valorMaoDeObraAprendiz;
  formData.valorEmpresa = resultComDesconto1 - valorMaoDeObraAprendiz;
  formData.cargo = cargo;
    
  
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
        window.location.reload();
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
  

  const resultTotal = formData.Motor * 5000 + formData.Freio * 6000 + formData.Suspensao * 9000 + formData.Transmissao * 8000  + formData.Turbo * 10000 + formData.OilPump * 2000 + formData.DriveShaft * 4500 + formData.CylinderHead * 3500 + formData.BatteryCables * 1500 + formData.FuelTank * 3000 + formData.DriftTires * 2000;
  // valor com desconto aplicado
  const resultDesconto1 = resultTotal * formData.QTDdesconto;
  const resultComDesconto1 = formData.QTDdesconto === 1 ? resultTotal : resultTotal - resultTotal * formData.QTDdesconto;
  const valorMaoDeObraAprendiz = resultComDesconto1 * formData.cargo;


  formData.custumizador = vendedor;
  formData.Motor = Motor;
  formData.Freio = Freio;
  formData.Suspensao = Suspensao;
  formData.Transmissao = Transmissao;
  formData.Turbo = Turbo;
  formData.OilPump= OilPump;
  formData.DriveShaft = DriveShaft;
  formData.CylinderHead = CylinderHead;
  formData.BatteryCables = BatteryCables;
  formData.FuelTank = FuelTank;
  formData.DriftTires = DriftTires;
  formData.QTDdesconto = QTDdesconto;
  formData.result = resultTotal;
  formData.valorMaoDeObra = valorMaoDeObraAprendiz;
  formData.valorEmpresa = resultComDesconto1 - valorMaoDeObraAprendiz;
  formData.cargo = cargo;

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


      const [state, setState] = React.useState({
        Motor1: false,
        Freio1: false,
        Suspensao1: false,
        Transmissao1: false,
        Turbo1: false,
        OilPump1: false,
        DriveShaft1: false,
        CylinderHead1: false,
        BatteryCables1: false,
        FuelTank1: false,
        DriftTires1: false,
      });
    
      const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        setState({
          ...state,
          [name]: checked,
        });
      
        // Atualize os valores nos estados correspondentes
        switch (name) {
          case 'Motor1':
            setMotor(checked ? 1 : 0);
            break;
          case 'Freio1':
            setFreio(checked ? 1 : 0);
            break;
          case 'Suspensao1':
            setSuspensao(checked ? 1 : 0);
            break;
          case 'Transmissao1':
            setTransmissao(checked ? 1 : 0);
            break;
          case 'Turbo1':
            setTurbo(checked ? 1 : 0);
            break;
          case 'OilPump1':
            setOilPump(checked ? 1 : 0);
            break;
          case 'DriveShaft1':
            setDriveShaft(checked ? 1 : 0);
            break;
          case 'CylinderHead1':
            setCylinderHead(checked ? 1 : 0);
            break;
          case 'BatteryCables1':
            setBatteryCables(checked ? 1 : 0);
            break;
          case 'FuelTank1':
            setFuelTank(checked ? 1 : 0);
            break;
          case 'DriftTires1':
            setDriftTires(checked ? 1 : 0);
            break;
          // Adicione casos para outros checkboxes conforme necessário
          default:
            break;
        }
      };
    
      const { 
        Motor1,
        Freio1,
        Suspensao1,
        Transmissao1,
        Turbo1,
        OilPump1,
        DriveShaft1,
        CylinderHead1,
        BatteryCables1,
        FuelTank1,
        DriftTires1
      } = state;


      React.useEffect(() => {
        console.log('Debug updateValores:');
        console.log('Motor:', Motor);
        console.log('Freio:', Freio);
        console.log('Transmissao:', Transmissao);
        console.log('result:', result);
        console.log('valorAprendiz:', valorAprendiz);
        console.log('Desconto:', QTDdesconto);
        console.log('Cargo:', cargo);
        console.log('valorMaquinaAprendiz:', valorMaquinaAprendiz);
        console.log('valorMaoAprendiz:', valorMaoAprendiz);
      }, [Motor, Freio, Suspensao, Transmissao, Turbo, OilPump, DriveShaft, CylinderHead, BatteryCables, FuelTank, DriftTires]);
          
  return (
      
      <main className={styles.main}>
      <Head>
        <title>StrokeMaster</title>
        <link rel="icon" href="/strokemaster.png" />
      </Head>
        <div className={styles.containerBox}>
          <div className={styles.box1}>  
            <div className={styles.boxTitulo}>
              <h1>Calculadora StrokeMaster</h1>
            </div>
            <div className={styles.boxInputs1}>            
              <form className={styles.box2} onSubmit={handleSubmit}>
                <div className={styles.box2topo}>

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
                  <InputLabel id="demo-simple-select-label">Tem cupom?</InputLabel>
                  <Select
                    type='number'
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    onChange={handleQTDdescontoChange}
                    value={String(QTDdesconto)}
                    name="QTDdesconto"
                    label="Quantidade de desconto"                    
                  >
                    <MenuItem value={1}>Não tem</MenuItem>      
                    <MenuItem value={0.10}>10%</MenuItem>
                    <MenuItem value={0.15}>15%</MenuItem>      
                    <MenuItem value={0.20}>20%</MenuItem>     
                    <MenuItem value={0.50}>50%</MenuItem>       
                  </Select>
                </FormControl>
                </div>
                <div className={styles.box2middle}>
                  <FormControl required component="fieldset" sx={{ m: 1 , justifyContent: 'center' }} variant="standard">
                    <FormGroup sx={{ m: 1 , justifyContent: 'center' }} row>
                      <FormControlLabel
                        control={
                          <Checkbox checked={Motor1} onChange={handleChange} name="Motor1" />
                        }
                        label="Motor"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox checked={Freio1} onChange={handleChange} name="Freio1" />
                        }
                        label="Freio"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox checked={Suspensao1} onChange={handleChange} name="Suspensao1" />
                        }
                        label="Suspensão"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox checked={Transmissao1} onChange={handleChange} name="Transmissao1" />
                        }
                        label="Transmissão"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox checked={Turbo1} onChange={handleChange} name="Turbo1" />
                        }
                        label="Turbo"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox checked={OilPump1} onChange={handleChange} name="OilPump1" />
                        }
                        label="Oil Pump"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox checked={DriveShaft1} onChange={handleChange} name="DriveShaft1" />
                        }
                        label="Drive Shaft"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox checked={CylinderHead1} onChange={handleChange} name="CylinderHead1" />
                        }
                        label="Cylinder Head"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox checked={BatteryCables1} onChange={handleChange} name="BatteryCables1" />
                        }
                        label="Battery Cables"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox checked={FuelTank1} onChange={handleChange} name="FuelTank1" />
                        }
                        label="Fuel Tank"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox checked={DriftTires1} onChange={handleChange} name="DriftTires1" />
                        }
                        label="Drift Tires"
                      />
                    </FormGroup>
                  </FormControl>
                </div>

                <div className={styles.boxCargo}>
                  <FormControl variant='standard' sx={{ m: 1, width: '30ch' }}>
                    <InputLabel id="demo-simple-select-label">Qual seu cargo?</InputLabel>
                    <Select
                      type='number'
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      onChange={handleCargoChange}
                      value={String(cargo)}
                      name="desgastado"
                      label="Qual seu cargo?"                    
                    >
                      <MenuItem value={0.13}>Aprendiz</MenuItem>      
                      <MenuItem value={0.17}>Mecânico</MenuItem>
                      <MenuItem value={0.22}>Estoquista</MenuItem>
                      <MenuItem value={0.30}>Gerente</MenuItem>            
                    </Select>
                  </FormControl>
                </div>
                  
                  <div className={styles.boxInputs2}>              
                    <input value={formData.result} type="hidden" name="result" id="" />
                    <input value={Motor} type="hidden" name="Motor" id="" />
                    <input value={Freio} type="hidden" name="Freio" id="" />
                    <input value={Suspensao} type="hidden" name="Suspensao" id="" />
                    <input value={Transmissao} type="hidden" name="Transmissao" id="" />
                    <input value={Turbo} type="hidden" name="Turbo" id="" />
                    <input value={OilPump} type="hidden" name="OilPump" id="" />
                    <input value={DriveShaft} type="hidden" name="DriveShaft" id="" />
                    <input value={CylinderHead} type="hidden" name="CylinderHead" id="" />
                    <input value={BatteryCables} type="hidden" name="BatteryCables" id="" />
                    <input value={FuelTank} type="hidden" name="FuelTank" id="" />
                    <input value={DriftTires} type="hidden" name="DriftTires" id="" />
                  </div>   
                  <div className={styles.btnBox}>
                    <Button
                      variant="outlined"
                      color="error"
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
                          right: '10%',
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
                  <h1>{cargoNome}</h1>
                  <h2>VALOR TOTAL</h2>
                </div> 
                <div>
                  <p>${result}</p>
                </div>
                <div>
                  <h2>VALOR NA MÃO</h2>
                </div> 
                <div>
                  <p>${valorMaoAprendiz}</p>
                </div>
                <div>
                  <h2>VALOR NA MAQUINA</h2>
                </div> 
                <div>
                  <p>${valorMaquinaAprendiz}</p>
                </div>
                {QTDdesconto !== 1 &&(
                  <div>
                    <div>
                      <h2>VALOR COM DESCONTO</h2>
                    </div>
                    <div>
                      <p>${resultComDesconto}</p>
                    </div>
                  </div>
                  
                )}
              </div>   
          </section>             
        </div>
        <footer className={styles.assinatura}>
          <p>© Feito por Ellyson Alves</p>
        </footer>
      </main>
  )
}
