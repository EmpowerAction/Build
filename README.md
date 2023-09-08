# EmpowerAction


The paper presents a comprehensive framework for our decentralized EmpowerAction economy. It focuses on the structuring and regulation of supply and demand pricing, balances, issuance, and circulation of tokens, as well as credit management within the system.

<p align="center">
<img src="https://github.com/EmpowerAction/Public/blob/master/img/E1.png?raw=true" width="500" />
</p>

A dynamic approach has been implemented to secure reserves for the issuance of credits, making use of the issuer's favorable positions to decrease the total required balance provided as collateral.

The system accepts stablecoin deposits as collateral for the issuance of ERC20 option tokens. Chainlink-based pricing feeds provide the exchange with updates on the underlying onchain price and volatility.

At maturity, each option contract is settled and paid in cash by the credit provider's contract, remaining open for redemption by token holders. In the event that any job applicant runs out of funds during settlement, the credit provider will record a debt, essentially performing a loan transaction.

The registered debt will accrue minimal interest (to be adjusted) until it is repaid by the borrower. Payment occurs when the borrower settles in cash (the outstanding debt will be deducted from the proceeds) or explicitly if the borrower makes a new stablecoin deposit on the platform.

If he does not have sufficient stablecoins or equivalents available at the time of application due to operational reasons, the applicant will instead receive ERC20 credit DUS tokens issued by the credit provider. These credit tokens are a promise of future payment, serving as a substitute for stablecoins, as they are redeemable for stablecoins with a 1:1 value conversion ratio, and are essential to keep the exchange afloat during episodes of illiquidity.

Credit token holders can request to withdraw (and burn) their balance for stablecoins as long as there are sufficient funds available to process the transaction; otherwise, the withdrawal request will be queued FIFO while the borrower raises funds, accruing interest until it is finally processed to make up for the delay.
The test cases defined in test/finance provide more information on the progress of the implementation.

## Table of contents

* [Overview](https://github.com/EmpowerAction/DApp-Contracts#Overview)
* [File Structure](https://github.com/EmpowerAction/DApp-Contracts#File Structure)
* [Smart Contracts](https://github.com/EmpowerAction/DApp-Contracts#Smart Contracts)
* [Governance](https://github.com/EmpowerAction/DApp-Contracts#Governance)
* [Finance](https://github.com/EmpowerAction/DApp-Contracts#Finance)
* [Underlying feeds](https://github.com/EmpowerAction/DApp-Contracts#Underlying feeds)
* [Credit tokens](https://github.com/EmpowerAction/DApp-Contracts#Credit tokens)
* [Feeds](https://github.com/EmpowerAction/DApp-Contracts#Feeds)
* [Deployment](https://github.com/EmpowerAction/DApp-Contracts#Deployment)
* [Interfaces](https://github.com/EmpowerAction/DApp-Contracts#Interfaces)
* [Licensing](https://github.com/EmpowerAction/DApp-Contracts#)

## Overview

This repository contains the smart contracts for EmpowerAction's decentralized economy. The contracts are written in Solidity and are deployed on the Ethereum network.

\`\`\`bash
git clone https://github.com/EmpowerAction/DApp-Contracts.git
cd DApp-Contracts
\`\`\`

## Installation

To install the dependencies, run the following command:

\`\`\`bash
npm install
\`\`\`

## File Structure

The project's structure is as follows:

- `contracts/`: Contains the smart contracts.
- `migrations/`: Migration scripts.
- `test/`: Unit tests.

## Smart Contracts

The smart contracts are located in the `contracts/` folder. To compile them, run:

\`\`\`bash
truffle compile
\`\`\`

## Governance

The project's governance is managed through a DAO. Details can be found in `contracts/Governance.sol`.

## Finance

Financial management is handled by the `Finance.sol` contract. This contract manages the issuance and circulation of tokens.

## Underlying Feeds

The underlying price feeds are provided by Chainlink.

## Credit Tokens

Credit tokens are issued by the `CreditToken.sol` contract and have a 1:1 value ratio with stablecoins.

## Feeds

Price and volatility feeds are provided by Chainlink and are located in `contracts/Feeds.sol`.

## Deployment

To deploy the contracts, use:

\`\`\`bash
truffle migrate
\`\`\`

## Interfaces

Interfaces for interacting with the contracts can be found in `contracts/interfaces/`.

## Licensing

This project is licensed under the MIT license. Please refer to the `LICENSE` file for more details.
