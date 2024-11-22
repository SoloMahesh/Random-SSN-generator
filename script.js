function generateBelgianNRN() {
    const year = Math.floor(Math.random() * (2006 - 1950 + 1)) + 1950; // Random year between 1950 and 2006
    const month = Math.floor(Math.random() * 12) + 1; // Random month between 1 and 12
    const day = Math.floor(Math.random() * 28) + 1;  // Random day between 1 and 28

    const yy = year.toString().slice(-2); // Last two digits of the year
    const mm = month.toString().padStart(2, '0'); // Ensure 2-digit month
    const dd = day.toString().padStart(2, '0');   // Ensure 2-digit day

    let seqNumber = Math.floor(Math.random() * 999) + 1; // Random 1 to 999
    seqNumber = seqNumber % 2 === 1 ? seqNumber : seqNumber + 1; // Ensure odd for males
    const seqNumberStr = seqNumber.toString().padStart(3, '0'); // Ensure 3 digits

    const fullYear = year >= 2000 ? `${year}${mm}${dd}${seqNumberStr}` : `${yy}${mm}${dd}${seqNumberStr}`;
    const checkDigit = 97 - (parseInt(fullYear, 10) % 97);

    const nrn = `${yy}.${mm}.${dd}-${seqNumberStr}.${checkDigit.toString().padStart(2, '0')}`;
    return nrn;
}

document.getElementById('generateBtn').addEventListener('click', () => {
    const nrn = generateBelgianNRN();
    const modalBody = document.getElementById('modalBody');
    modalBody.textContent = nrn;

    const ssnModal = new bootstrap.Modal(document.getElementById('ssnModal'), {
        keyboard: true
    });
    ssnModal.show();
});

document.getElementById('copyBtn').addEventListener('click', () => {
    const nrn = document.getElementById('modalBody').textContent;
    navigator.clipboard.writeText(nrn).then(() => {
        const copyToast = new bootstrap.Toast(document.getElementById('copyToast'));
        copyToast.show();
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
});

document.getElementById('bulkGenerateBtn').addEventListener('click', () => {
    const bulkCountInput = document.getElementById('bulkCount');
    const validationMessage = document.getElementById('bulkCountValidation');
    const count = parseInt(bulkCountInput.value);

    // Validate input
    if (isNaN(count) || count < 1 || count > 800) {
        validationMessage.style.display = 'inline'; // Show error message (use 'inline' for a span)
        validationMessage.textContent = 'Limit up to 800.';
        bulkCountInput.classList.add('is-invalid'); // Add Bootstrap invalid class for styling
        return; // Exit function to prevent generating SSNs
    }

    // Hide validation message and reset input styling
    validationMessage.style.display = 'none';
    bulkCountInput.classList.remove('is-invalid');

    // Generate SSNs
    const bulkResult = document.getElementById('bulkResult');
    bulkResult.innerHTML = ''; // Clear previous results

    for (let i = 0; i < count; i++) {
        const nrn = generateBelgianNRN();
        const ssnItem = document.createElement('div');
        ssnItem.classList.add('ssn-item');

        const ssnText = document.createElement('span');
        ssnText.textContent = nrn;

        const copyIcon = document.createElement('i');
        copyIcon.classList.add('ssn-copy', 'bi', 'bi-clipboard');
        copyIcon.innerHTML = '<i class="bi bi-clipboard"></i>';
        copyIcon.addEventListener('click', () => {
            navigator.clipboard.writeText(nrn).then(() => {
                const copyToast = new bootstrap.Toast(document.getElementById('copyToast'));
                copyToast.show();
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
        });

        ssnItem.appendChild(ssnText);
        ssnItem.appendChild(copyIcon);
        bulkResult.appendChild(ssnItem);
    }
});


document.getElementById('copyAllBtn').addEventListener('click', () => {
    const ssns = Array.from(document.querySelectorAll('.ssn-item span')).map(span => span.textContent).join('\n');
    navigator.clipboard.writeText(ssns).then(() => {
        const copyToast = new bootstrap.Toast(document.getElementById('copyToast'));
        copyToast.show();
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
});
