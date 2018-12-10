function updateData(tableName, target, changeTo) {
    const update = `
    UPDATE ${tableName}
    SET ${target} = ${changeTo}
    WHERE 
    `
}
function deleteData(tableName, condition) {
    const deleteData = `
    DELETE FROM ${tableName}
    WHERE ${condition}`
}
