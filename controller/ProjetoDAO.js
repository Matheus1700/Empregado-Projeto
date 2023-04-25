const db = require('../infra/db/mysqldb');

const salvarProjeto = async(empregado)=>{
    const sqlInsert = 'INSERT INTO projeto(nome, data_inicio, data_termino, descricao) VALUES (?, ?, ?, ?)'
    const values = [empregado.nome, empregado.data_inicio, empregado.data_termino, empregado.descricao]
    const con = await db.getConnection();
        return await con.execute(sqlInsert, values)
}

const listarProjeto = async()=>{
    const sqlSelect = 'SELECT * FROM projeto'
    const con = await db.getConnection()
        return await con.execute(sqlSelect)
}

const removerProjeto = async(id)=>{
    const sqlDelete = 'DELETE FROM projeto WHERE id = ?'
    const values = [id]
    const con = await db.getConnection()
        return await con.execute(sqlDelete, values)
}

const atualizarProjeto = async(empregado)=>{
    const sqlUpdate = 'UPDATE projeto SET nome = ?, data_inicio = ?, data_termino = ?, descricao = ? WHERE id = ?';
    const values = [empregado.nome, empregado.data_inicio, empregado.data_termino, empregado.descricao, empregado.id];
    const con = await db.getConnection();
    return await con.execute(sqlUpdate, values);
}

const getProjetoById = async(id)=>{
    const sqlSelectedById = 'SELECT id, nome, data_inicio, data_termino, descricao FROM projeto WHERE id = ?';
    const values = [id];
    const con = await db.getConnection();
    return await con.execute(sqlSelectedById, values);
}


module.exports = {salvarProjeto, listarProjeto, removerProjeto, atualizarProjeto, getProjetoById}