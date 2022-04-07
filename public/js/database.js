// Creating all database variables and functions

let db;

const indexedDB = window.indexedDB ||
                    window.mozIndexedDB ||
                      window.webkitIndexedDB ||
                        window.msIndexedDB ||
                          window.shimIndexedDB;

const request = indexedDB.open("budget", 1);

request.onupgradeneeded = function(event) {
    const db = event.target.result;
    db.createObjectStore("Pending", {autoIncrement:true});
};

function saveRecord(record){
    const transaction = db.transaction(["Pending"], "readwrite");
    const save = transaction.objectStore("Pending");
    save.add(record);
};

function checkDB() {
    const transaction = db.transaction(["Pending"], "readwrite");
    const save = transaction.objectStore("Pending");
    const getAll = save.getAll();
    getAll.onsuccess = function(){
        if(getAll.result.length > 0) {
            fetch("api/transaction/bulk", {
                method:"POST",
                body:JSON.stringify(getAll.result),
                headers:{Accept:"application/json, test/plain, */*", "Content-Type": "application/json"}
            })
        
        }
    }
}
                        