import { Keccak } from 'sha3';

(async () => {
    const hash = new Keccak(256);
    hash.update('kuyyyyyy');
    hash.digest('hex');
    console.log(hash());  
})();