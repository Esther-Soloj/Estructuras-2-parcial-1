class Nodo{
    constructor(
        public data: Producto,
        public prev: Nodo | null = null,
        public next: Nodo | null = null
    ){}
    }

class DoubleLinkedList{
    private head: Nodo | null = null;
    private tail: Nodo | null = null;

    public insert(data: Producto): void{
        const newNode = new Nodo(data);
        if (!this.tail){
            this.head = newNode;
            this.tail = newNode;
        } else{
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }
    }

    public search(carnet: number): Producto | null{
        let current = this.head;
        while (current){
            if (current.data.getCodigo() == carnet){
                return current.data;
            }
        }
        return null;
    } 

    public print(): string{
        if (!this.head) return "-----";
        let result: string = "";
        let current: Nodo | null = this.head;

        while (current){
            if (current.next == null){
                result += current.data;
            }
            else{
                result += current.data + " || ";
            }
            current = current.next;
        }

        return result;
    }
}

class Producto{
    private nombre: string;
    private cod: number;
    private precio_costo: number;
    private precio_venta: number;

    constructor(nombre: string, cod: number, precio_costo:number, precio_venta: number){
        this.nombre = nombre;
        this.cod = cod;
        this.precio_costo = precio_costo;
        this.precio_venta = precio_venta;
    }

    public getNombre(): string{
        return this.nombre;
    }

    public getCodigo(): number{
        return this.cod;
    }

    public getPrecioCosto(): number{
        return this.precio_costo;
    }

    public getPrecioVenta(): number{
        return this.precio_venta;
    }
    public toString(): string{
        return String(this.cod) + " - " + this.nombre + " - " + this.precio_costo + " - " + this.precio_venta;
    }
}

class HashTable{
    private size : number;
    private data: DoubleLinkedList[];

    constructor(){
        this.size = 20;
        this.data = new Array(20);
        for (let i = 0; i < this.size; i++) {
            this.data[i] = new DoubleLinkedList();
        }
    }

    private hash(key: number): number{
        return key % this.size;
    }

    public insert(student:  Producto): void{
        let index: number = this.hash(student.getCodigo());
        this.data[index].insert(student);
    }

    public search(cod: number): Producto | null{
        let index: number = this.hash(cod);
        return this.data[index].search(cod);
    }

    public print(): void{
        for (let i=0; i<20; i++){
            console.log(i+1 + ". " + this.data[i].print());
        }
    }
}

let bienvenida: string = "\nBienvenido al gestor de productos de farmacia  👩‍💻";

console.log(bienvenida);
console.log("\n");
let producto1: Producto = new Producto("PEPTO BISMOL", 22, 50, 65);
let producto2: Producto = new Producto("SUKROL", 13, 25, 30)
let producto3: Producto = new Producto("ACETAMINOFEN", 45, 45, 55);
let producto4: Producto = new Producto("IBUPROFEN ", 60, 15, 35);
let producto5: Producto = new Producto("PANADOL", 26, 18, 15);
let producto6: Producto = new Producto("ASPIRINA", 90, 22, 16);
let myTabla: HashTable = new HashTable();

myTabla.insert(producto1);
myTabla.insert(producto2);
myTabla.insert(producto3);
myTabla.insert(producto4);
myTabla.insert(producto5);
myTabla.insert(producto6);

let desconocido: Producto | null;
desconocido = myTabla.search(22);
console.log("BUSCAMOS el producto con el codigo P001");
if (desconocido == null){
    console.log("El producto no existe en la lista");
}
else{
    console.log("Buscado: " + desconocido.toString());
}
console.log("");
console.log("producto en la lista:");
console.log("CODIGO - NOMBRE - PRECIO COSTO - PRECIO VENTA");
myTabla.print();


let mensaje: string = "\n🇬🇹programa realizado por María Esther Tiguilá Soloj 👩‍💻";
console.log(mensaje);

// NO BUSCA POR CODIGO P001 NI POR NADA QUE TENGA P 