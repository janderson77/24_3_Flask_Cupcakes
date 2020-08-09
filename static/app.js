const api_url = 'http://localhost:5000/api';

function generateCupcakeHTML(cupcake) {
	return `
    <div data-cupcake-id=${cupcake.id}>
      <li>
        ${cupcake.flavor} / ${cupcake.size} / ${cupcake.rating}
        <button class="delete-button">X</button>
      </li>
      <img class="Cupcake-img"
            src="${cupcake.image}"
            alt="(no image provided)">
    </div>
    `;
}

async function showStartingCupcakes() {
	const res = await axios.get(`${api_url}/cupcakes`);

	for (let cupcakeData of res.data.cupcakes) {
		let newCupcake = $(generateCupcakeHTML(cupcakeData));
		$('#cupcakes').append(newCupcake);
	}
}

$('#cupcake-form').on('submit', async function(e) {
	e.preventDefault();

	let flavor = $('#form-flavor').val();
	let rating = $('#form-rating').val();
	let size = $('#form-size').val();
	let image = $('#form-image').val();

	const newCupcakeResponse = await axios.post(`${api_url}/cupcakes`, { flavor, rating, size, image });

	let newCupcake = $(generateCupcakeHTML(newCupcakeResponse.data.cupcake));
	$('#cupcakes').append(newCupcake);
	$('#cupcake-form').trigger('reset');
});

$('#cupcakes').on('click', '.delete-button', async function(e) {
	e.preventDefault();

	let $cupcake = $(e.target).closest('div');
	let cupcakeId = $cupcake.attr('data-cupcake-id');

	await axios.delete(`${api_url}/cupcakes/${cupcakeId}`);
	$cupcake.remove();
});

$(showStartingCupcakes);
