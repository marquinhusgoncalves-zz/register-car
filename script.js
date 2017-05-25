(function($) {
  'use strict';
  // o window.DOM foi importado com o nome $

var app = (function appController() {
  return {
    init: function init () {
      this.companyInfo();
      this.initEvents();
      this.removeCar();
      this.infoCar();
    },

    initEvents: function initEvents() {
      $('[data-js="form-register"]').on('submit', this.handleSubmit);
    },

    

    createNewCar: function createNewCar() {
      var $fragment = document.createDocumentFragment();
      var $tr = document.createElement('tr');
      $tr.setAttribute('data-js', 'item-car');
      var $button = document.createElement('a');
      $button.className = 'btn-floating waves-effect waves-light red';
      $button.setAttribute('data-js', 'btn-remove');
      var $icon = document.createElement('i');
      $icon.className = 'material-icons';
      var $tdImage = document.createElement('td');
      var $image = document.createElement('img');
      var $tdBrand = document.createElement('td');
      var $tdYear = document.createElement('td');
      var $tdPlate = document.createElement('td');      
      var $tdColor = document.createElement('td');
      var $tdRemove = document.createElement('td');

      $image.setAttribute('src', $('[data-js="image"]').get().value)
      $tdImage.appendChild($image);

      $tdBrand.textContent = $('[data-js="brand-model"]').get().value;
      $tdYear.textContent = $('[data-js="year"]').get().value;
      $tdPlate.textContent = $('[data-js="plate"]').get().value;
      $tdColor.textContent = $('[data-js="color"]').get().value;

      $icon.textContent = 'no_sim';
      
      $button.appendChild($icon);
      $tdRemove.appendChild($button);     

      $tr.appendChild($tdImage);
      $tr.appendChild($tdBrand);
      $tr.appendChild($tdYear);
      $tr.appendChild($tdPlate);
      $tr.appendChild($tdColor);
      $tr.appendChild($tdRemove);

      return $fragment.appendChild($tr);
    },

    companyInfo: function companyInfo() {
      var ajax = new XMLHttpRequest();
      ajax.open('GET','company.json', true);
      ajax.send();
      ajax.addEventListener('readystatechange', this.getCompanyInfo, false);
    },

    getCompanyInfo: function getCompanyInfo() {
      if(!app.isReady.call(this))
        return;

        var data = JSON.parse(this.responseText);
        var $companyName = $('[data-js="company-name"]').get();
        var $companyPhone = $('[data-js="company-phone"]').get();
        $companyName.textContent = data.name;
        $companyPhone.textContent = data.phone;
    },

    isReady: function isReady() {
      return this.readyState === 4 && this.status === 200;
    },

    removeCar: function removeCar() {
      var $btnRemove = document.querySelector('[data-js="table-car"]');
      $btnRemove.addEventListener('click', function() {
        var $itemCar = document.querySelector('[data-js="item-car"]');
        $itemCar.remove();
      }, false);
    },

    infoCar: function infoCar() {
      var ajax = new XMLHttpRequest();
      ajax.open('GET', 'http://localhost:3000/car');
      ajax.send();
      ajax.addEventListener('readystatechange', function() {
         if(ajax.readyState === 4 && ajax.status === 200) {
          console.log(ajax.responseText);
        }
      }, false)
    },

    postInfoCar: function postInfoCar() {
      
    },

    handleSubmit: function handleSubmit(e) {
      e.preventDefault();
      // var $tableCar = $('[data-js="table-car"]').get();
      // $tableCar.appendChild(app.createNewCar());
      var ajax = new XMLHttpRequest();
      ajax.open('POST', 'http://localhost:3000/car');
      ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      ajax.send('image=http://www.walmart.com&brandModel=ferrari&year=2018&plate=AAA1111&color=vermelho');

      ajax.onreadystatechange = function() {
        if(ajax.readyState === 4) {
          console.log('Usuário cadastrado');
        }
      };
      this.infoCar();
    },

  };
})();

app.init();
})(window.DOM);

/* 
Já temos as funcionalidades de adicionar e remover um carro. Agora, vamos persistir esses dados, 
salvando-os temporariamente na memória de um servidor.

Nesse diretório do `challenge-32` tem uma pasta `server`. É um servidor simples, em NodeJS, para 
que possamos utilizar para salvar as informações dos nossos carros.

Para utilizá-lo, você vai precisar fazer o seguinte:

- Via terminal, acesse o diretório `server`;
- execute o comando `npm install` para instalar as dependências;
- execute `node app.js` para iniciar o servidor.

Ele irá ser executado na porta 3000, que pode ser acessada via browser no endereço: 
`http://localhost:3000`

O seu projeto não precisa estar rodando junto com o servidor. Ele pode estar em outra porta.
As mudanças que você irá precisar fazer no seu projeto são:

- Para listar os carros cadastrados ao carregar o seu projeto, faça um request GET no endereço
`http://localhost:3000/car`
- Para cadastrar um novo carro, faça um POST no endereço `http://localhost:3000/car`, enviando
os seguintes campos:
  - `image` com a URL da imagem do carro;
  - `brandModel`, com a marca e modelo do carro;
  - `year`, com o ano do carro;
  - `plate`, com a placa do carro;
  - `color`, com a cor do carro.

Após enviar o POST, faça um GET no `server` e atualize a tabela para mostrar o novo carro cadastrado.
*/