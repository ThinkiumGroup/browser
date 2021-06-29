/*
    This file is part of web3.js.

    web3.js is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    web3.js is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/
/**
 * @file iban-tests.ts
 * @author Josh Stevens <joshstevens19@hotmail.co.uk>
 * @date 2018
 */

import { Iban, IndirectOptions } from 'web3-eth-iban';

const iban = 'XE7338O073KYGTWWZN0F2WZ0R8PX5ZPPZS';
const address = '0x45cd08334aeedd8a06265b2ae302e3597d8faa28';


const ibanClass = new Iban(iban);


ibanClass.isDirect();

ibanClass.isIndirect();

ibanClass.checksum();

ibanClass.institution();

ibanClass.client();

ibanClass.toAddress();

Iban.toAddress(iban);


Iban.toAddress(345);

Iban.toAddress({});

Iban.toAddress(true);

Iban.toAddress(['string']);

Iban.toAddress([4]);

Iban.toAddress(null);

Iban.toAddress(undefined);


Iban.toIban(address);


Iban.toIban(345);

Iban.toIban({});

Iban.toIban(true);

Iban.toIban(['string']);

Iban.toIban([4]);

Iban.toIban(null);

Iban.toIban(undefined);


Iban.fromAddress(address);


Iban.fromAddress(345);

Iban.fromAddress({});

Iban.fromAddress(true);

Iban.fromAddress(['string']);

Iban.fromAddress([4]);

Iban.fromAddress(null);

Iban.fromAddress(undefined);


Iban.fromBban('ETHXREGGAVOFYORK');


Iban.fromBban(345);

Iban.fromBban({});

Iban.fromBban(true);

Iban.fromBban(['string']);

Iban.fromBban([4]);

Iban.fromBban(null);

Iban.fromBban(undefined);

const indirectOptions: IndirectOptions = {
    institution: 'XREG',
    identifier: 'GAVOFYORK'
};


Iban.createIndirect(indirectOptions);


Iban.createIndirect(345);

Iban.createIndirect('string');

Iban.createIndirect(true);

Iban.createIndirect(['string']);

Iban.createIndirect([4]);

Iban.createIndirect(null);

Iban.createIndirect(undefined);


Iban.isValid(iban);


Iban.isValid(345);

Iban.isValid({});

Iban.isValid(true);

Iban.isValid(['string']);

Iban.isValid([4]);

Iban.isValid(null);

Iban.isValid(undefined);
