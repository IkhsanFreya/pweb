document.addEventListener('DOMContentLoaded', function() {
    const wealthInput = document.getElementById('wealthAmount');
    const resultAmount = document.querySelector('.result-amount');
    const zakatType = document.getElementById('zakatType');
    const resultTitle = document.querySelector('.result-section h3');

    // Updated Nisab values according to current standards
    const GOLD_PRICE = 1087000; // Current price per gram
    const SILVER_PRICE = 11500; // Current price per gram
    const NISAB_GOLD = 85 * GOLD_PRICE; // 85 grams of gold
    const NISAB_SILVER = 595 * SILVER_PRICE; // 595 grams of silver
    const RICE_PRICE = 13000; // Price per kg
    const NISAB_AGRICULTURE = 653 * RICE_PRICE; // 653 kg of rice
    const NISAB_LIVESTOCK = NISAB_GOLD; // Using gold standard for livestock

    function calculateZakat(type, amount) {
        let zakatAmount = 0;

        switch(type) {
            case 'mal':
                // Harta harus mencapai nisab dan dimiliki selama 1 tahun
                zakatAmount = amount >= NISAB_GOLD ? amount * 0.025 : 0;
                break;

            case 'profesi':
                // Menggunakan nisab perak untuk pendapatan bulanan
                zakatAmount = amount >= NISAB_SILVER ? amount * 0.025 : 0;
                break;

            case 'logam':
                // Emas: 85 gram, Perak: 595 gram
                zakatAmount = amount >= NISAB_GOLD ? amount * 0.025 : 0;
                break;

            case 'fitrah':
                // 2.5 kg beras atau makanan pokok
                zakatAmount = 2.5 * RICE_PRICE;
                break;

            case 'perniagaan':
                // Modal + Keuntungan - Hutang
                zakatAmount = amount >= NISAB_GOLD ? amount * 0.025 : 0;
                break;

            case 'tambang':
                // Ma'din (tambang): 2.5%, Rikaz (harta terpendam): 20%
                zakatAmount = amount * 0.025;
                break;

            case 'pertanian':
                if (amount >= NISAB_AGRICULTURE) {
                    // 10% jika pengairan alami (hujan)
                    // 5% jika pengairan buatan (irigasi)
                    zakatAmount = amount * 0.1;
                }
                break;

            case 'peternakan':
                if (amount >= NISAB_LIVESTOCK) {
                    // Unta: mulai dari 5 ekor
                    // Sapi: mulai dari 30 ekor
                    // Kambing: mulai dari 40 ekor
                    zakatAmount = amount * 0.025;
                }
                break;

            case 'rikaz':
                // Harta temuan: 20%
                zakatAmount = amount * 0.2;
                break;

            case 'surat-berharga':
                // Saham, obligasi, dll: 2.5%
                zakatAmount = amount >= NISAB_GOLD ? amount * 0.025 : 0;
                break;

            default:
                zakatAmount = amount >= NISAB_GOLD ? amount * 0.025 : 0;
        }

        return zakatAmount;
    }

    function getNisabValue(type) {
        switch(type) {
            case 'pertanian':
                return NISAB_AGRICULTURE;
            case 'profesi':
                return NISAB_SILVER;
            case 'peternakan':
                return NISAB_LIVESTOCK;
            default:
                return NISAB_GOLD;
        }
    }

    wealthInput.addEventListener('input', function() {
        const amount = parseFloat(this.value) || 0;
        const type = zakatType.value;
        const nisabValue = getNisabValue(type);
        
        resultTitle.textContent = `Zakat ${zakatType.options[zakatType.selectedIndex].text} Kamu`;
        
        const zakatAmount = calculateZakat(type, amount);
        
        const nisabMessage = type !== 'fitrah' && type !== 'rikaz' ? 
            (amount >= nisabValue ? ' (Mencapai Nisab)' : ' (Belum Mencapai Nisab)') : '';
        
        resultAmount.textContent = `Rp ${zakatAmount.toLocaleString('id-ID', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        })}${nisabMessage}`;
    });

    zakatType.addEventListener('change', function() {
        wealthInput.dispatchEvent(new Event('input'));
    });
});