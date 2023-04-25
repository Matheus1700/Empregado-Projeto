const express = require('express');
var exphbs  = require('express-handlebars');
const {Projeto} = require('./model/Projeto');
const {Empregado} = require('./model/Empregado');
const projetoDAO = require('./controller/ProjetoDAO');
const empregadoDAO = require('./controller/EmpregadoDAO');
const res = require('express/lib/response');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(__dirname+'/public'));

// as minhas funcoes viraram isso que ta dentro dos 'get's e dos 'post's
app.engine('hbs', exphbs.engine({
    defaultLayout: 'main', 
    extname:'.hbs'
}));


app.set('view engine', 'hbs');
app.get('/', (req, res)=>{
    res.render('main',{layout:'home'});
});


// projetos
app.get('/projetos',async (req, res)=>{  
    const [projetos] = await projetoDAO.listarProjeto();
    console.log('Projetos: '+projetos);
    res.render('main',{layout:'projetos/listar', projetos});
})

app.get('/projetos/novo', async(req,res)=>{ 
    console.log('cadastrar novo projeto');
    res.render('main',{layout:'projetos/form'});
});

app.post('/projetos/cadastrar', async(req,res)=>{
        const projeto = new Projeto();
        projeto.nome = req.body.nome;
        projeto.data_inicio = req.body.data_inicio;
        projeto.data_termino = req.body.data_termino;
        projeto.descricao = req.body.descricao;
        console.log(`Nome: ${projeto.nome}`);

        if (req.body.id) { 
            projeto.id = req.body.id;
            await projetoDAO.atualizarProjeto(projeto);
        } else {
            await projetoDAO.salvarProjeto(projeto);
        }
        
        res.redirect('/projetos')
})

app.get('/projetos/remover', async(req, res)=>{
    console.log(req.query)
    const id = req.query.id; 
    await projetoDAO.removerProjeto(id) 
    res.redirect('/projetos')
})

app.get('/projetos/editar', async(req, res)=>{
    const [projetos] = await projetoDAO.getProjetoById(req.query.id);
    console.log('cats ' +JSON.stringify(projetos));
    const projeto = projetos[0];
    res.render('main', {layout: 'projetos/form', projeto});
})



// empregados
app.get('/empregados', async (req, res)=>{
    const [empregados] = await empregadoDAO.listarEmpregados();
    console.log('Empregados: '+empregados);
    res.render('main',{layout:'empregados/listar', empregados});
});

app.get('/empregados/novo', async(req, res)=>{
    console.log('Cadastrar Novo empreagado');
    res.render('main', {layout:'empregados/form'});
});

app.post('/empregados/cadastrar', async(req, res)=>{
    const empregado = new Empregado();
    empregado.nome = req.body.nome;
    empregado.sobrenome = req.body.sobrenome;
    empregado.salario = req.body.salario;
    empregado.data_nascimento = req.body.data_nascimento;
    empregado.id_projeto = req.body.id_projeto;
    
    if (req.body.id) {
        empregado.id = req.body.id;
        await empregadoDAO.atualizarEmpregado(empregado);
    } else {
        await empregadoDAO.salvarEmpregado(empregado);
    }

    res.redirect('/empregados')
})

app.get('/empregados/remover', async(req, res)=>{
    console.log(req.query)
    const id = req.query.id
    await empregadoDAO.removerEmpregado(id);
    res.redirect('/empregados')
})

app.get('/empregados/editar', async(req, res)=>{
    const [empregados] = await empregadoDAO.getEmpregadoById(req.query.id);
    const empregado = empregados[0];
    res.render('main', {layout: 'empregados/form', empregado});
})


app.listen('9000',()=>{
    console.log('Up and Running!');
});