$(document).ready(function () {
    const SERVICES_URL = 'https://atelierdosabor-api.vercel.app/services';
    const MENU_URL = 'https://atelierdosabor-api.vercel.app/menu';

    $.ajax({
        url: SERVICES_URL,
        method: 'GET',
        dataType: 'json',
        success: function (services) {
            $('.service-item').each(function (index) {
                const service = services[index];
                if (!service) return;

                $(this).find('.service-image')
                    .attr('src', service.banner)
                    .attr('alt', service.title);

                $(this).find('.service-title').text(service.title);
                $(this).find('.service-description').text(service.description);
            });
        },
        error: function () {
            console.error('Erro ao carregar os serviços');
        }
    });

    $.ajax({
        url: MENU_URL,
        method: 'GET',
        dataType: 'json',
        success: function (menu) {

            const mapTabs = {
                'Entradas': '#entradas .row',
                'Pratos principais': '#pratos-principais .row',
                'Sobremesas': '#sobremesas .row',
                'Bebidas não alcoólicas': '#bebidas-nao-alcoolicas .row',
                'Bebidas alcoólicas': '#bebidas-alcoolicas .row'
            };

            menu.forEach(category => {
                const container = $(mapTabs[category.title]);
                if (!container) return;

                container.empty();

                category.products.forEach(product => {
                    const card = `
                    <div class="col-md-3 mb-4">
                        <img class="d-block w-100 rounded" src="${product.image}" alt="${product.title}">
                        <h5 class="text-colored fw-bold mt-2">${product.title}</h5>
                        <p>${product.description}</p>
                        <strong class="text-colored">R$ ${product.price.toFixed(2)}</strong>
                    </div>
                `;
                    container.append(card);
                });
            });
        },
        error: function () {
            console.error('Erro ao carregar o cardápio');
        }
    });


    $('.menu-hamburguer').click(function () {
        $('nav').slideToggle();
    })

    function truncateText(className, maxLength) {
        $(className).each(function() {
            var text = $(this).text();
            if (text.length > maxLength) {
                var truncatedText = text.substring(0, maxLength) + '...';
                $(this).text(truncatedText);
            }
        });
    }

    truncateText('.desc-produto', 97);


    $('#telefone').mask('(00) 00000-0000', {
        placeholder: '(__) _____-____'
    })

    $('form').validate({
        rules: {
            telefone: {
                minlength: 15
            }
        },
        submitHandler: function(form) {
            console.log(form);
            form.reset();
        }
    });
});