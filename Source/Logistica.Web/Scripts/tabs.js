function slideonlyone(thechosenone) {
	$('.newboxes').each(function (index) {
		$(this).slideUp(1);
		if ($(this).attr("id") == thechosenone) {
			$(this).slideDown(1);
		}
	});
}
$('.question a').click(function () {
	$('.question a.active-main').removeClass('active-main');
	$(this).closest('a').addClass('active-main');
});
