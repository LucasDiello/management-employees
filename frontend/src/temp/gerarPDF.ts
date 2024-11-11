import pdfMake from "pdfmake/build/pdfmake";
import vfsFonts from "pdfmake/build/vfs_fonts";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../libs/firebaseConfig";
import { FormData } from "../types";
import dayjs from "dayjs";
import defaultUser from "../pages/addemployee/userDefault.jpg";

pdfMake.vfs = vfsFonts.pdfMake.vfs;

const gerarPDF = async (formData : FormData, saved = false) => {
  const docDefinition: any = {
    content: [  
    {  
        columns: [  
            {   
                text: 'EMPRESA FICTICIA LTDA.',   
                style: 'header',   
            },  
            {   
                text: 'GESTÃO DE EMPREGADOS 2024',   
                style: 'header',   
                alignment: 'right',   
            }  
        ]  
    },  
    {  
        text: "Registro do Empregado",  
        alignment: "center",  
        bold: true,  
        style: "title"  
    },  
    {text: "Informações do Funcionário-", style: "sectionHeader"},  
    {  
        columns: [  
            {  
                style: 'infoTable',  
                color: '#333',  
                table: {  
                    widths: [150, 150],  
                    body: [  
                        [{text: "Setor:", style: 'tableHeader'}, `${formData.funcionario.setor}`],  
                        [{text: "Cargo:", style: 'tableHeader'}, ` ${formData.funcionario.cargo}`],  
                        [{text: "Salário:", style: 'tableHeader'}, `R$ ${formData.funcionario.salario}`],  
                        [{text: "Status:", style: 'tableHeader'}, `${formData.funcionario.status}`] ,  
                        [{text: "Data de Admissão:", style: 'tableHeader'}, `${dayjs(formData.funcionario.dataAdmissao).format("DD-MM-YYYY")}`]  
                    ]  
                },  
                layout: 'headerLineOnly'
            }
        ],
    },  
    {text: "Informações de Contato-", style: "sectionHeader"},  
    {  
        style: 'contactTable',  
        color: '#333',  
        table: {  
            widths: [160, 150, 90, 100],  
            body: [  
                [  
                    {text: 'Registro de Identificação', style: 'tableHeader', alignment: 'center'},  
                    {text: 'Nome', style: 'tableHeader', alignment: 'center'},  
                    {text: 'CPF', style: 'tableHeader', alignment: 'center'},  
                    {text: 'RG', style: 'tableHeader', alignment: 'center'}  
                ],  
                [  
                    { text: `${formData.id}`, alignment: 'center' },  
                    { text:  `${formData.contato.nome}`, alignment: 'center' },  
                    { text: `${formData.contato.cpf}`, alignment: 'center' },  
                    { text: `${formData.contato.rg} `, alignment: 'center' },  
                ],  
            ],  
        },  
        layout: 'lightHorizontalLines',
    },
    {  
        style: 'contactTable',
        color: '#333',  
        table: {  
            widths: [150, 150, 190],  
            body: [  
                [  
                    {text: 'Telefone', style: 'tableHeader', alignment: 'center'},  
                    {text: 'Email', style: 'tableHeader', alignment: 'center'},  
                    {text: 'Endereço', style: 'tableHeader', alignment: 'center'},  
                ],  
                [  
                    { text: `${formData.contato.telefone}`, alignment: 'center' },  
                    { text: `${formData.contato.email}`, alignment: 'center' },  
                    { text: `${formData.contato.endereco.rua}, ${formData.contato.endereco.numero} - ${formData.contato.endereco.bairro} - ${formData.contato.endereco.cidade} - ${formData.contato.endereco.estado} - ${formData.contato.endereco.cep}`, alignment: 'center' },  
                ],  
            ],  
        },  
        layout: 'lightHorizontalLines',
    },
    {  
        text: "Benefícios-",
        style: "sectionHeader" 
    },
    {
        style: 'benefitsTable',
        color: '#333',  
        table: {  
            widths: [150, 70],
            body: [
                [{ text: "Plano de Saúde:", style: 'tableHeader' }, `${formData.funcionario.beneficios.planoSaude ? "Sim" : "Não"}`],
                [{ text: "Vale Refeição:", style: 'tableHeader' }, `R$ ${formData.funcionario.beneficios.valeRefeicao}`],
                [{ text: "Vale Transporte:", style: 'tableHeader' }, `${formData.funcionario.beneficios.valeTransporte ? "Sim" : "Não"}`],
                [{ text: "Auxílio Home Office:", style: 'tableHeader' }, `${formData.funcionario.beneficios.auxilioHomeOffice ? "Sim" : "Não"}`],
                [{ text: "Auxílio Creche:", style: 'tableHeader' }, `${formData.funcionario.beneficios.auxilioCreche ? "Sim" : "Não"}`],
            ]
        },
        layout: 'noBorders',
    },
            {
        style: 'ass',
        color: '#333',  
        table: {  
            widths: [520,0],
            body: [
                [{ text: "", style: 'tableHeader' }, ""],
                                    [{ text: "Assinatura do funcionário:", style: 'tableHeader' }, ""],

            ]
        },
        layout: 'lightHorizontalLines',
    },
    {
        columns: [  
            {   
                text: 'EMPRESA FICTICIA LTDA.',   
                style: 'footer',   
            },  
            {   
                text: 'GESTÃO DE EMPREGADOS 2024',   
                style: 'footer',   
                alignment: 'right',   
            }  
        ]  
    }, 
],  
styles: {  
    header: {  
        fontSize: 12,  
        bold: true,  
        margin: [0, 5, 0, 10]  
    },  
    title: {  
        fontSize: 20,  
        bold: true,  
        margin: [0, 10, 0, 10]  
    },  
    sectionHeader: {  
        fontSize: 14,  
        bold: true,  
        color: '#0b6bcb',  
        margin: [0, 15, 0, 5]  
    },  
    tableHeader: {  
        bold: true,  
        color: '#333',  
        margin: [0, 5, 5, 5]  
    },  
    infoTable: {  
        margin: [0, 5, 0, 10]  
    },
    contactTable: {
        margin: [0, 5, 0, 10]
    },
    benefitsTable: {
        margin: [0, 5, 0, 10]
    },
    ass: {
        marginTop: 50,  
                    alignment: 'center',  

    },
    footer: {  
        fontSize: 10,  
        color: '#aaaaaa',  
        margin: [0, 10, 0, 0]  
    }
}  
};

  try {

      const pdfBlob = await new Promise<Blob>((resolve) => {
          pdfMake.createPdf(docDefinition).getBlob((blob) => {
              resolve(blob);
            });
        });
        
        const date = new Date();
        const formattedDate = `${dayjs(date).format("DD-MM-YYYY")}_${dayjs(date).format("HH:mm:ss")}`;
        
        if (saved) {
          pdfMake.createPdf(docDefinition).download("relatorio.pdf");
          return
        }
        
        const fileName = `formulario_${formattedDate}.pdf`;
        const storageRef = ref(
            storage,
            `pdfs/${formData.id}/${fileName}`
        );
        

        uploadBytesResumable(storageRef, pdfBlob);

    } catch (error) {
        console.error(error);
    }

};


export default gerarPDF;