const db = require('../infra/db/mysqldb');

const salvarEmpregado = async(empregado)=>{
    const sqlInsert = 'INSERT INTO empregado(nome, sobrenome, salario, data_nascimento, id_projeto) VALUES (?, ?, ?, ?, ?)'
    const values = [empregado.nome, empregado.sobrenome, empregado.salario, empregado.data_nascimento, empregado.id_projeto]
    const con = await db.getConnection();
        return await con.execute(sqlInsert, values)
}

const listarEmpregados = async()=>{
    const sqlSelect = 'SELECT * FROM empregado'
    const con = await db.getConnection()
        return await con.execute(sqlSelect)
}

const removerEmpregado = async(id)=>{
    const sqlDelete = 'DELETE FROM empregado WHERE id = ?'
    const values = [id]
    const con = await db.getConnection()
        return await con.execute(sqlDelete, values)
}

const atualizarEmpregado = async(empregado)=>{
    const sqlUpdate = 'UPDATE empregado SET nome = ?, sobrenome = ?, salario = ?, data_nascimento = ? WHERE id = ?';
    const values = [empregado.nome, empregado.sobrenome, empregado.salario, empregado.data_nascimento, empregado.id];
    const con = await db.getConnection();
    return await con.execute(sqlUpdate, values);
}

const getEmpregadoById = async(id)=>{
    const sqlSelectedById = 'SELECT id, nome, sobrenome, salario, data_nascimento, id_projeto FROM empregado WHERE id = ?';
    const values = [id];
    const con = await db.getConnection();
    return await con.execute(sqlSelectedById, values);
}


module.exports = {salvarEmpregado, listarEmpregados, removerEmpregado, atualizarEmpregado, getEmpregadoById}