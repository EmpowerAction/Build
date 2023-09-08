# EmpowerAction

El documento presenta una sofisticada arquitectura para un ecosistema financiero descentralizado, EmpowerAction. Se centra en la dinámica de un mercado de empleos descentralizado, intercambiando a traves activos criptográficos y los mecanismos de crédito.

## Tabla de Contenidos

- [Introducción](#introducción)
- [Estructura del Repositorio](#estructura-del-repositorio)
  - [Contracts](#contracts)
    - [Deployment](#deployment)
    - [Feeds](#feeds)
    - [Finance](#finance)
    - [Governance](#governance)
    - [Interfaces](#interfaces)
    - [Utils](#utils)
  - [Test](#test)
    - [Common](#common)
      - [Actors](#actors)
      - [Mock](#mock)
    - [Feeds](#feeds-1)
    - [Finance](#finance-1)
      - [CreditToken](#credittoken)
      - [TalentsExchange](#talentsexchange)
    - [Governance](#governance-1)
    - [Utils](#utils)
  - [Migrations](#migrations)
- [Licencia](#licencia)

## Introducción

Conceptos clave:

Equilibrio del mercado: La fijación de precios oferta-demanda se regula estrictamente mediante mecanismos algorítmicos, garantizando la estabilidad del mercado.

Asignación dinámica de reservas: La colateralización para la emisión de créditos emplea el posicionamiento de activos en tiempo real, optimizando así la cantidad de garantía requerida.

Colateralización Stablecoin: Para la emisión de Tokens EMP y DUS (ERC20), la plataforma acepta stablecoins como activo mitigador del riesgo.

Oráculos de precios: Los oráculos basados en Chainlink suministran valoraciones de activos en tiempo real y datos de volatilidad del mercado para facilitar operaciones de intercambio precisas.

Liquidación de creditos: Al vencimiento del contrato, el contrato inteligente de emisión de crédito se liquida en fiat, lo que permite la quema de tokens por parte de los titulares.

Gestión de impagos: En escenarios con restricciones de liquidez, el emisor registra una transacción de préstamo contra la parte morosa, marcando un devengo de interés nominal hasta la resolución.

Fichas de crédito: Los tokens DUS actúan como garantía en ausencia de una garantía stablecoin adecuada, manteniendo una paridad de valor 1:1 con las stablecoins. Se emiten para preservar la continuidad operativa durante las crisis de liquidez.

Canje y retirada: Los titulares de tokens de crédito pueden canjear o quemar tokens por stablecoins cuando estén disponibles; de lo contrario, se producen colas FIFO de solicitudes de retirada, con intereses devengados que compensan los retrasos.

## Estructura del Repositorio

### Contracts

#### Deployment

La carpeta `deployment` contiene contratos esenciales para el despliegue y la gestión de los contratos inteligentes de la dApp. A continuación, se describen los archivos clave:

### Proxy.sol

Este contrato permite la actualización de contratos. Actúa como un proxy que redirige llamadas a una dirección lógica donde reside la implementación real del contrato.

#### Funcionalidades principales:

- Redirección de llamadas a contratos implementados.
- Gestión de estados.

### ManagedContract.sol

Este contrato gestiona otros contratos en el ecosistema. Funciona como una capa intermedia que facilita la interacción entre diferentes contratos.

#### Funcionalidades principales:

- Inicialización y gestión de contratos.
- Funciones auxiliares para la interacción entre contratos.

### Deployer.sol

Este contrato es responsable del despliegue de otros contratos en la cadena de bloques. Facilita la automatización del proceso de despliegue.

#### Funcionalidades principales:

- Despliegue de contratos inteligentes.
- Configuración inicial durante el despliegue.


#### Feeds


La carpeta `feeds` contiene contratos relacionados con la alimentación de datos externos en la dApp. Actualmente, se utiliza Chainlink para esta función.

### ChainlinkFeed.sol

Este contrato implementa la interfaz de UnderlyingFeed y utiliza el oráculo de Chainlink para obtener datos en tiempo real.

#### Funcionalidades principales:

- Integración con la interfaz AggregatorV3 de Chainlink.
- Utilización de distintas librerías para operaciones matemáticas y de tipo seguro.
- Obtención de datos en tiempo real para la dApp.

---


#### Finance

La carpeta `finance` contiene contratos relacionados con las funciones financieras de la dApp, como la gestión de créditos, tokens canjeables e intercambios financieros.

### CreditProvider.sol & CreditToken.sol

Estos contratos gestionan la provisión y el seguimiento de créditos dentro de la dApp.

```solidity
// Ejemplo de uso
CreditProvider.issueCredit(to, amount);
```

### OptionsExchange.sol, OptionToken.sol & OptionTokenFactory.sol

Estos contratos permiten la creación y el intercambio de acciónes.

```solidity
// Ejemplo de uso
OptionsExchange.createOption(strikePrice, expiry);
```

### RedeemableToken.sol

Contrato para tokens que pueden ser canjeados por activos subyacentes.

```solidity
// Ejemplo de uso
RedeemableToken.redeem(amount);
```

### UnderlyingVault.sol

Almacena los activos subyacentes para los tokens canjeables y creditos.

```solidity
// Ejemplo de uso
UnderlyingVault.deposit(amount);
```

#### Governance

La carpeta `governance` contiene contratos que gestionan la gobernanza de la dApp, incluyendo la creación y gestión de propuestas y ajustes del protocolo.

### GovToken.sol

Contrato del token de gobernanza utilizado para votar en propuestas.

```solidity
// Ejemplo de uso
GovToken.mint(to, amount);
```

### Proposal.sol & ProposalsManager.sol

Contratos para la creación y gestión de propuestas en el sistema de gobernanza.

```solidity
// Ejemplo de uso
ProposalsManager.createProposal(subject, details);
```

### ProposalWrapper.sol

Contrato que envuelve propuestas para la ejecución de acciones específicas.

```solidity
// Ejemplo de uso
ProposalWrapper.execute();
```

### ProtocolSettings.sol

Contrato para ajustar parámetros del protocolo y la dApp.

```solidity
// Ejemplo de uso
ProtocolSettings.setSetting(key, value);
```


#### Interfaces

La carpeta `interfaces` contiene definiciones de interfaces que son implementadas por otros contratos en la dApp. Estas interfaces establecen los métodos obligatorios que los contratos deben implementar.

### AggregatorV3Interface.sol

Interfaz para el oráculo de precios Chainlink.

```solidity
// Ejemplo de uso
AggregatorV3Interface.latestRoundData();
```

### IERC20.sol, IERC20Details.sol, IERC20Permit.sol, IERC20PermitAllowed.sol

Interfaces para la implementación de tokens ERC20, con detalles adicionales y permisos.

```solidity
// Ejemplo de uso
IERC20.transfer(to, amount);
```

### ILiquidityPool.sol

Interfaz para la gestión de pools de liquidez.

```solidity
// Ejemplo de uso
ILiquidityPool.addLiquidity(amount);
```

### IUniswapV2Router01.sol

Interfaz para interactuar con el router de Uniswap V2.

```solidity
// Ejemplo de uso
IUniswapV2Router01.swapExactTokensForTokens(amountIn, amountOut, path, to);
```

### TimeProvider.sol & UnderlyingFeed.sol

Interfaces para proveer tiempo y datos subyacentes, respectivamente.

```solidity
// Ejemplo de uso
TimeProvider.getBlockTime();
UnderlyingFeed.getPrice();
```

#### Utils

La carpeta `utils` contiene contratos de utilidad que ofrecen funciones comunes y reutilizables. Estas funciones auxilian en tareas como operaciones matemáticas seguras, manipulación de direcciones y manejo de tokens ERC20, entre otras.

### Address.sol

Proporciona utilidades para la manipulación y verificación de direcciones Ethereum.

```solidity
// Ejemplo de uso
require(Address.isContract(someAddress), "Given address is not a contract");
```

### Arrays.sol

Ofrece métodos para la manipulación de arrays en Solidity.

```solidity
// Ejemplo de uso
Arrays.removeAtIndex(someArray, index);
```

### BlockTimeProvider.sol

Permite acceder al tiempo de bloque de Ethereum dentro de los contratos.

```solidity
// Ejemplo de uso
uint256 currentBlockTime = BlockTimeProvider.getBlockTime();
```

### ERC20.sol & SafeERC20.sol

Implementaciones de la interfaz ERC20 y métodos seguros para interactuar con tokens ERC20.

```solidity
// Ejemplo de uso
IERC20(someToken).safeTransfer(recipient, amount);
```

### MoreMath.sol, SafeCast.sol, SafeMath.sol, SignedSafeMath.sol

Estos contratos proporcionan funciones para realizar operaciones matemáticas seguras, conversiones de tipo y operaciones aritméticas con signo.

```solidity
// Ejemplo de uso
uint256 result = SafeMath.add(a, b);
```

### Test

### Common

#### Actors

Esta subcarpeta contiene pruebas unitarias y de integración para los contratos que representan a los diferentes actores en la plataforma, ubicada en la subcarpeta `common/actors` del repositorio.

##### ShareHolder.sol

Pruebas para validar las funcionalidades asociadas con los titulares de acciones.

```solidity
// Ejemplo de uso
ShareHolder.testShareHolding();
```

##### PoolTrader.sol

Pruebas para validar las funcionalidades asociadas con los comerciantes del pool de liquidez.

```solidity
// Ejemplo de uso
PoolTrader.testPoolTrading();
```

##### OptionsTrader.sol

Pruebas para validar las funcionalidades asociadas con los comerciantes de opciones.

```solidity
// Ejemplo de uso
OptionsTrader.testOptionsTrading();
```

##### CreditHolder.sol

Pruebas para validar las funcionalidades asociadas con los titulares de crédito.

```solidity
// Ejemplo de uso
CreditHolder.testCreditHolding();
```

#### Mock

Esta subcarpeta está ubicada dentro de `common/mock` y contiene contratos simulados que imitan el comportamiento de ciertos contratos y servicios externos para fines de prueba.

##### UniswapV2RouterMock.sol

Mock del router de Uniswap V2 para simular operaciones de swap y liquidez.

```solidity
// Ejemplo de uso
UniswapV2RouterMock.swapExactTokensForTokens(...);
```

##### TimeProviderMock.sol

Mock del proveedor de tiempo para simular diferentes marcas de tiempo en las pruebas.

```solidity
// Ejemplo de uso
TimeProviderMock.setBlockTime(...);
```

##### ManagedContractMock.sol

Mock del contrato administrado para probar su inicialización y gestión.

```solidity
// Ejemplo de uso
ManagedContractMock.init(...);
```

##### EthFeedMock.sol

Mock para simular una fuente de datos de precio de Ether.

```solidity
// Ejemplo de uso
EthFeedMock.setPrice(...);
```

##### ERC20Mock.sol

Mock del contrato ERC20 para simular operaciones de tokens.

```solidity
// Ejemplo de uso
ERC20Mock.mint(...);
```

##### AggregatorV3Mock.sol

Mock de la interfaz AggregatorV3 para simular feeds de datos.

```solidity
// Ejemplo de uso
AggregatorV3Mock.setLatestPrice(...);
```

#### Finance

##### CreditToken

Esta subcarpeta contiene pruebas unitarias y de integración para los contratos relacionados con el token de crédito en la subcarpeta `finance/creditToken` del repositorio.

#### Base.sol

Archivo base que contiene utilidades comunes para las pruebas.

#### TestCreditTokenInterest.sol

Pruebas para validar la acumulación de intereses en el token de crédito.

```solidity
// Ejemplo de uso
TestCreditTokenInterest.testAccumulateInterest();
```

#### TestCreditTokenIssuance.sol

Pruebas para validar la emisión correcta de tokens de crédito.

```solidity
// Ejemplo de uso
TestCreditTokenIssuance.testIssueToken();
```

#### TestCreditTokenWithdraw.sol

Pruebas para validar la retirada de tokens de crédito.

```solidity
// Ejemplo de uso
TestCreditTokenWithdraw.testWithdrawToken();
```


##### TalentsExchange

Esta subcarpeta contiene pruebas unitarias y de integración para los contratos relacionados con el intercambio de talentos en la subcarpeta `finance/TalentsExchange` del repositorio.

#### Base.sol

Archivo base que contiene utilidades comunes para las pruebas.

#### TestActionIntrinsicValue.sol

Pruebas para validar el valor intrínseco de las acciones en el intercambio.

```solidity
// Ejemplo de uso
TestActionIntrinsicValue.testIntrinsicValue();
```

#### TestActionTrading.sol

Pruebas para validar la funcionalidad de trading de acciones.

```solidity
// Ejemplo de uso
TestActionTrading.testTrading();
```

#### TestCoveredOption.sol

Pruebas para validar las opciones cubiertas en el intercambio.

```solidity
// Ejemplo de uso
TestCoveredOption.testCoveredOption();
```

#### TestExchangeDeposit.sol

Pruebas para validar los depósitos en el intercambio.

```solidity
// Ejemplo de uso
TestExchangeDeposit.testDeposit();
```

#### TestExpectedPayout.sol

Pruebas para validar el cálculo del pago esperado en el intercambio.

```solidity
// Ejemplo de uso
TestExpectedPayout.testExpectedPayout();
```

#### TestWriteAction.sol

Pruebas para validar la escritura de acciones en el intercambio.

```solidity
// Ejemplo de uso
TestWriteAction.testWriteAction();
```

#### Utils

Esta subcarpeta contiene pruebas unitarias y de integración para los contratos de utilidad en la subcarpeta `contracts/utils` del repositorio.

#### TestMoreMath.sol

Pruebas para validar las operaciones matemáticas más complejas proporcionadas por el contrato `MoreMath`.

```solidity
// Ejemplo de uso
TestMoreMath.testComplexOperation();
```


## Licencia

SPDX-License-Identifier: LGPL-3.0

EmpowerAction - Copyright (C) 2023 Santiago Canepa | Sebastian Leandro | Victoria Quiroga
This project is licensed under the GNU Lesser General Public License, Version 3 (LGPL-3.0). See the file LICENSE.md for more details.


