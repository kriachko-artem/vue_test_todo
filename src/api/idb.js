export const idb = {
    options: {
        database: 'Todos',
        version: 1,
        table:
            {
                name: 'Todos',
                keyPath: 'id',
                autoIncrement: false,
            }

    },
    request: function () {
        return window.indexedDB.open(this.options.database, this.options.version)
    },
    init: function () {
        // eslint-disable-next-line no-unused-vars
        const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
        let request = this.request()
        request.onerror = () => {
            alert("Error")
        }
        request.onupgradeneeded = () => {
            let db = request.result
            let store = db.createObjectStore(
                this.options.table.name,
                {
                    autoIncrement: this.options.table.autoIncrement
                })
            // eslint-disable-next-line no-unused-vars
            let index = store.createIndex('id','id',{unique:true})
        }
    },
    put: function (data) {
        let request = this.request()
        request.onsuccess = () => {
            console.log('Good')
            const db = request.result
            let transaction = db.transaction(this.options.table.name, 'readwrite')
            let store = transaction.objectStore(this.options.table.name)
            store.put(data,data.id)
            transaction.oncomplete = () => {
                db.close()
            }
        }
    },
    getAll: function () {
        return new Promise((resolve) => {
                let request = this.request()
                request.onsuccess = () => {
                    const db = request.result
                    let transaction = db.transaction(this.options.table.name, 'readwrite')
                    let store = transaction.objectStore(this.options.table.name)
                    const result = store.getAll()
                    result.onsuccess = () => {
                        resolve(result.result)
                    }
                    transaction.oncomplete = () => {
                        db.close()
                    }
                }
            }
        )
    },
    delete: function (id) {
        let request = this.request()
        request.onsuccess = () => {
            console.log('Good')
            const db = request.result
            let transaction = db.transaction(this.options.table.name, 'readwrite')
            let store = transaction.objectStore(this.options.table.name)
            store.delete(id)
            transaction.oncomplete = () => {
                db.close()
            }
        }
    },
};






