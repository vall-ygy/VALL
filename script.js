document.addEventListener('DOMContentLoaded', () => {
	const menuLinks = document.querySelectorAll('.menu-items a');
	const toolContents = document.querySelectorAll('.tool-content');
	
	menuLinks.forEach(link => {
		link.addEventListener('click', (e) => {
			e.preventDefault();
			const toolId = link.getAttribute('data-tool');
			
			toolContents.forEach(c => c.classList.remove('active'));
			document.getElementById(toolId).classList.add('active');
			
			menuLinks.forEach(l => l.classList.remove('active-link'));
			link.classList.add('active-link');
		});
    });

	const qrInput = document.getElementById('qrInput');
	const generateQrBtn = document.getElementById('generateQrBtn');
	const qrResult = document.getElementById('qrResult');
	const downloadQrBtn = document.getElementById('downloadQrBtn');
	
	generateQrBtn.addEventListener('click', () => {
		const text = qrInput.value.trim();
		if (!text) {
			qrResult.innerText = 'Masukkan link terlebih dahulu.';
			return;
		}
		qrResult.innerHTML = '';
		new QRCode(qrResult, {
			text,
			width: 200,
			height: 200,
			colorDark: '#000000',
			colorLight: '#ffffff',
			correctLevel: QRCode.CorrectLevel.H
		});
	});
	
	downloadQrBtn.addEventListener('click', () => {
		const img = qrResult.querySelector('img');
		const canvas =qrResult.querySelector('canvas');
		if (!img && !canvas) {
			alert('Buat Qr dulu sebelum mendownload!');
			return;
		}
		let link = document.createElement('a');
		link.href = img ? img.src : canvas.toDataURL('image/png');
		link.download = 'qrcode.png';
		link.click();
	});
	
	const lengthSlider = document.getElementById('lengthSlider');
	const lengthValue = document.getElementById('lengthValue');
	const includeUppercase = document.getElementById('includeUppercase');
	const includeNumbers = document.getElementById('includeNumbers');
	const includeSymbols = document.getElementById('includeSymbols');
	const generatePassBtn = document.getElementById('generatePassBtn');
	const passwordResult = document.getElementById('passwordResult');
	
	lengthSlider.addEventListener('input', () => {
		lengthValue.textContent = lengthSlider.value;
	});
	
	generatePassBtn.addEventListener('click', () => {
		const len = Number(lengthSlider.value) || 12;
        let charset = 'abcdefghijklmnopqrstuvwxyz';
		if (includeUppercase.checked) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		if (includeNumbers.checked) charset += '0123456789';
		if (includeSymbols.checked) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';
		let pass = '';
		for (let i = 0; i < len; i++) {
			pass += charset.charAt(Math.floor(Math.random() * charset.length));
		}
		passwordResult.textContent = pass;
		passwordResult.style.borderColor = '#3498db';
	});
	
	passwordResult.addEventListener('click', () => {
		const text = passwordResult.textContent;
		if (!text || text.includes('Password akan muncul')) return;
		navigator.clipboard.writeText(text).then(() => {
			const prev = passwordResult.textContent;
			passwordResult.textContent = 'Disalin!';
			setTimeout(() => { passwordResult.textContent = prev; }, 1200);
        });
	});
});