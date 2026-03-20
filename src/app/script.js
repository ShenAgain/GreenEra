document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const hamburger = document.getElementById('hamburger');
    const closeBtn = document.getElementById('closeBtn');
    const overlay = document.getElementById('menuOverlay');

    const dropdownSelected = document.querySelector('.dropdown-selected');
    const dropdownOptions = document.querySelector('.dropdown-options');
    const dropdownItems = document.querySelectorAll('.dropdown-option');
    const hiddenInput = document.querySelector('#cats');

    hamburger.addEventListener('click', function() {
        sidebar.classList.add('open');
        overlay.classList.add('active');
    });

    closeBtn.addEventListener('click', function() {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
    });

    overlay.addEventListener('click', function() {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
    });

     // Toggle dropdown on click
     dropdownSelected.addEventListener('click', function() {
        dropdownOptions.classList.toggle('open');
    });

    // Handle option click
    dropdownItems.forEach(option => {
        option.addEventListener('click', function() {
            dropdownSelected.textContent = this.textContent;
            hiddenInput.value = this.dataset.value;
            dropdownOptions.classList.remove('open');
        });
    });

    // Close the dropdown if clicked outside
    document.addEventListener('click', function(e) {
        if (!dropdownSelected.contains(e.target) && !dropdownOptions.contains(e.target)) {
            dropdownOptions.classList.remove('open');
        }
    });
});
