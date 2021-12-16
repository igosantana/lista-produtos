const vitrinePrincipal = document.querySelector('#lista-principal')
const vitrineCarrinho = document.querySelector('#lista-carrinho')


const montarListaProdutos = (listaProdutos) => {

        const {nome,preco,secao,categoria,img,componentes,id} = listaProdutos 

        const li = document.createElement('li')
        const imagem = document.createElement('img')
        const h3 = document.createElement('h3')
        const p = document.createElement('p')
        const span = document.createElement('span')
        const ol = document.createElement('ol')
        const button = document.createElement('button')
        button.setAttribute('data-id', id)
        button.id = 'buttonComprar'
        
        

        componentes.forEach((componente) => {
            const liOl = document.createElement('li')
            liOl.innerText = componente
            ol.appendChild(liOl)
        })

        imagem.src = img
        imagem.alt = nome
        h3.innerText = nome
        p.innerText = preco
        span.innerText = secao
        button.innerText='Adicionar ao carrinho'

        li.appendChild(imagem)
        li.appendChild(h3)
        li.appendChild(p)
        li.appendChild(span)
        li.appendChild(ol)
        li.appendChild(button)

        return li
}

const listarProdutos = (arrayProdutos, callmontarListaProdutos, vitrine) => {

    vitrine.innerHTML = ''

    arrayProdutos.forEach(produto => {
        const templateProduto = callmontarListaProdutos(produto)
        vitrine.appendChild(templateProduto)
    })
}



const filtrarPorHortifruti = () => {
    const listaHortifruti = produtos.filter((produto) => {
        const {secao} = produto
        return secao === 'Hortifruti'
    })

    
    listarProdutos(listaHortifruti, montarListaProdutos, vitrinePrincipal)
}



const filtrarTodos = () => {
    const mostraTodos = produtos.filter((produto) => {
        return produto
    })
    
    listarProdutos(mostraTodos, montarListaProdutos, vitrinePrincipal)
    
}

const filtroInput = () => {
    
    const input = document.querySelector('.campoBuscaPorNome')
    let valorInput = input.value
    let valorInputMin = valorInput.toLowerCase()

    const filtradoInput = produtos.filter((produto) => {
        const {nome,secao,categoria} = produto
        const valorNomeMin = nome.toLowerCase()
        const valorSecaoMin = secao.toLocaleLowerCase()
        const valorCateMin =  categoria.toLocaleLowerCase()

        if(valorInputMin == valorNomeMin || valorInputMin == valorSecaoMin || valorInputMin == valorCateMin) {
            return produto
        }
    })

    
    listarProdutos(filtradoInput, montarListaProdutos, vitrinePrincipal)

}
let carrinhoCompra = []
const adicionaProdutoCarrinho = (idProduto) => {

    const produtoFiltrado = produtos.find(produto => produto.id == idProduto)

    carrinhoCompra.push(produtoFiltrado)

    listarProdutos(carrinhoCompra, montarListaProdutos, vitrineCarrinho)
    precoTotal(carrinhoCompra)
}


const precoTotal = (array) => {

    let soma = array.reduce((total, produto) => {
        const {preco} = produto
        const precoTratado = parseFloat(preco)
        return total + precoTratado 
    }, 0)

    const spanPreco = document.querySelector('#precoTotal')
    spanPreco.innerText = soma
}




/* Filtros */

const botaoMostrarHortifruti = document.querySelector('.estiloGeralBotoes--filtrarHortifruti')
botaoMostrarHortifruti.addEventListener('click', filtrarPorHortifruti)

const botaoMostraTodos = document.querySelector('.estiloGeralBotoes--mostrarTodos')
botaoMostraTodos.addEventListener('click', filtrarTodos)

const botaoInput = document.querySelector('.estiloGeralBotoes--botaoBuscaPorNome')
botaoInput.addEventListener('click', filtroInput)

/* ****  */


// Função do evento de click de compra para o carrinho
const evtCompra = (evt) => {
    const buttonComprar = evt.target
    if(buttonComprar.tagName == 'BUTTON'){
        const idProduto = buttonComprar.getAttribute('data-id')

        adicionaProdutoCarrinho(idProduto)
    }
}
vitrinePrincipal.addEventListener('click', evtCompra)



