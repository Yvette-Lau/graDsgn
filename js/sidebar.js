$(document).ready(function()
{
	var navItems = $('.sidebarlist li>a');
	var navListItems = $('.sidebarlist li');
	var allWells = $ ('.content');
	var allWellsExceptFirst = $('.content:not(:first)');

	allWellsExceptFirst.hide();
	navItems.click(function(e)
	{
		e.preventDefault();
		navListItems.removeClass('active');
		$(this).closest('li').addClass('active');

		allWells.hide();
		var target = $(this).attr('data-target-id');
		$('#' + target).show();
	});
});