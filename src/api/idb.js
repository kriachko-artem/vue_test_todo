export const idb = {
    options: {
        database: 'Test',
        version: 1,
        tables: {
            list: {
                name: 'Test_list',
                keyPath: 'id',
                autoIncrement: false,
            },
            categories: {
                name: 'Test_categories',
                keyPath: 'id',
                autoIncrement: false,
            }
        }

    },
    request: function () {
        return window.indexedDB.open(this.options.database, this.options.version)
    },
    init: function () {
        // eslint-disable-next-line no-unused-vars
        const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
        let request = this.request(this.options.database)
        request.onerror = () => {
            alert("Error")
        }
        request.onupgradeneeded = () => {
            let db = request.result
            let storeTodos = db.createObjectStore('Test_list', {
                autoIncrement: this.options.tables.list.autoIncrement
            })
            // eslint-disable-next-line no-unused-vars
            let indexTodos = storeTodos.createIndex('id', 'id', {unique: true})
            let storeCategories = db.createObjectStore(
                'Test_categories',
                {autoIncrement: this.options.tables.categories.autoIncrement})
            // eslint-disable-next-line no-unused-vars
            const indexCategories = storeCategories.createIndex('id', 'id', {unique: true});
            request.onsuccess = () => {
                const db = request.result
                const initAllItemTable = {id: 1, title: 'Все напоминания'};
                let transaction = db.transaction('Test_categories', 'readwrite')
                let store = transaction.objectStore('Test_categories')
                store.add(initAllItemTable, initAllItemTable.id)
                transaction.oncomplete = () => {
                    db.close()
                }
            }
        }
    },
    put: function (data) {
        let request = this.request()
        request.onsuccess = () => {
            const db = request.result
            let transaction = db.transaction(this.options.tables.list.name, 'readwrite')
            let store = transaction.objectStore(this.options.tables.list.name)
            store.add(data,data.id)
            transaction.oncomplete = () => {
                db.close()
            }
        }
    },
    mode: function (data) {
        let request = this.request()
        request.onsuccess = () => {
            const db = request.result
            let transaction = db.transaction(this.options.tables.list.name, 'readwrite')
            let store = transaction.objectStore(this.options.tables.list.name)
            store.put(data,data.id)
            transaction.oncomplete = () => {
                db.close()
            }
        }
    },
    createNewTable(table) {
        let request = this.request()
        request.onsuccess = () => {
            const db = request.result
            let transaction = db.transaction('Test_categories', 'readwrite')
            let store = transaction.objectStore('Test_categories')
            store.put(table, table.id)
            transaction.oncomplete = () => {
                db.close()
            }
        }
    },
    deleteTable: function (id) {
        let request = this.request()
        request.onsuccess = () => {
            const db = request.result
            let transaction = db.transaction(this.options.tables.categories.name, 'readwrite')
            let store = transaction.objectStore(this.options.tables.categories.name)
            store.delete(id)
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
                    let transaction = db.transaction(this.options.tables.list.name, 'readwrite')
                    let store = transaction.objectStore(this.options.tables.list.name)
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
    getTables: function () {
        return new Promise((resolve) => {
            let request = this.request()
            request.onsuccess = () => {
                const db = request.result
                let transaction = db.transaction(
                    this.options.tables.categories.name,
                    'readwrite')
                let store = transaction.objectStore(this.options.tables.categories.name)
                const result = store.getAll()
                result.onsuccess = () => {
                    resolve(result.result)
                }
                transaction.oncomplete = () => {
                    db.close()
                }
            }
        })
    },
};






