---
title: UINIO 系列开源硬件概览
mathjax: true
toc: true
---

# UINIO-MCU-RP2040 核心板

[**UINIO-MCU-RP2040**](https://gitee.com/uinika/UINIO-MCU-RP2040) 是一款基于树莓派 RP2040 微控制器的核心板，该主控芯片采用 **ARM Cortex-M0+** 双核心，运行频率高达 `133MHz`，片上内置有 `264KB` 容量的 **SRAM** 内存，并且能够外接高达 `16MB` 容量的片外 **Flash** 闪存（通过专用的 QSPI 总线进行连接），并且还集成有 DMA 控制器，以及 30 个 **GPIO** 引脚（其中 4 个可用作模拟输入）。除此之外，片上还拥有 2 个 **UART** 控制器、2 个 **SPI** 控制器、2 个 **I²C** 控制器，以及 16 个 **PWM** 通道。同时还支持 **USB 1.1** 设备和主机模式，以及 USB 大容量存储启动模式和拖放式编程。

<img src="../UINIO-MCU-RP2040/PCB-3D-1.png" width=500 />

<img src="../UINIO-MCU-RP2040/PCB-3D-2.png" width=500 />

## 设计概要

1. Flash 存储芯片采用了更加小巧的 `WSON8` 封装；
2. 添加 `SOD123` 封装的**肖特基势垒二极管**，用于防止正负级错误的反接；
3. 预留有 `2mm` 的固定螺丝孔，便于安装至 3D 打印外壳，或者搭建成套的产品原型；
4. 添加了用于全局异步复位的 **RESET** 按钮（低电平有效），便于在上电状态进行复位操作以及更新固件；
5. 引出了官方 Pico 开发板没有的 `GPIO23` 和 `GPIO24` 两个引脚资源，并且在 `GPIO25` 引脚采用了与 Pico 相同的测试用 LED 发光二极管；
6. 由于 ADC 引脚内部集成有连接至 `IOVDD`（`3.3V`）的反向二极管，所以采用了 FET 场效应管 **DMG1012T** 防止在 RP2040 没有上电的时候，这些引脚上施加的电压通过 `ADC3` 引脚泄露到 `3.3V` 电源网络；

> **注意**： 核心板引脚顺序并不完全兼容官方的 **Raspberry Pi Pico** 开发板。

## 固件更新

**UINIO-MCU-RP2040** 的固件更新操作流程如下面步骤所示：

1. 按住 **BOOT** 按键不放，将核心板的 Type-C 接口连接到电脑的；
2. 等待 1 秒钟之后，松开 **BOOT** 按键，此时计算机会自动将 **UINIO-MCU-RP2040** 识别为可移动磁盘；
3. 将等待下载的固件拖动或者复制到该可移动磁盘当中，此时 **RP2040** 主控会自动重启并且加载固件；

## 参考技术文档

[UinIO.com 电子技术实验室](http://uinio.com/) 为 UINIO-MCU-RP2040 开源项目提供了如下一系列技术参考资料：

- [《交互式 BOM 物料清单与 PCB 版图在线预览》](http://uinio.com/archives/BOM/UINIO-MCU-RP2040.html)
- [《基于树莓派 UINIO-MCU-RP2040 核心板制作逻辑分析仪》](http://uinio.com/Project/UINIO-MCU-RP2040/)

# UINIO-MCU-HC32F460KETA 核心板

[**UINIO-MCU-HC32F460KETA**](https://gitee.com/uinika/UINIO-MCU-HC32F460KETA) 是一款基于小华半导体 **HC32F460KETA-LQFP64** 型微控制器的核心板，该款微控制器的最大特点是支持 `1.8V ~ 3.6V` 的**宽电压范围**，和 `-40℃ ~ 105℃` 的**宽温度范围**。基于 **ARM Cortex-M4** 内核架构，最高工作频率可以达到 `200MHz`，内置有 **DSP** 数字信号处理器和 **FPU** 浮点运算单元。除此之外，还集成有 `512KB` 的 Flash 存储器，以及 `192KB` 的 SRAM 存储器。

<img src="../UINIO-MCU-HC32F460KETA/PCB-3D-1.png" width=450 />

<img src="../UINIO-MCU-HC32F460KETA/PCB-3D-2.png" width=450 />

## 设计概要

- 外部晶振电路，全部使用了打孔包地处理；
- 扩展了两路串联有自恢复保险丝的 `5V` 电源接口，整体采用覆铜处理，以提升接口的载流能力；
- 模拟电源引脚 `AVSS` 和 `AVCC` 都串联有对 `100Mhz` 高频杂散信号存在 `1KΩ` 阻抗的磁珠；
- 对调试下载接口 SWD 进行了前置处理，并且匹配了通信线序，可以方便快速的与 [**UINIO-DAPLink**](https://gitee.com/uinika/UINIO-DAPLink) 进行杜邦线连接；
- 引出了全部的 **52** 个 GPIO 端口，可以自由的使用 **8** 种常见的外设通信接口：

| 接口名称       | 数量  | 描述                                                                        |
| :------------- | :---- | :-------------------------------------------------------------------------- |
| **GPIO**       | 52 个 | `PAx`、`PBx`、`PCx`、`PDx`、`PHx` 一共五组。                                |
| **I2C**        | 3 组  | 支持 SMBus 协议。                                                           |
| **USART**      | 4 组  | 支持 ISO7816-3 协议。                                                       |
| **SPI**        | 4 组  | 支持 4 线式 SPI 模式和 3 线式时钟同步模式，支持全双工和只传送两种通信方式。 |
| **QSPI**       | 1 组  | 支持 `200Mbps` 高速访问的存储器控制模块。                                   |
| **I2S**        | 4 组  | 内置音频 PLL 支持音频级采样精度。                                           |
| **SDIO**       | 2 组  | 支持 SD/MMC/eMMC 格式。                                                     |
| **CAN**        | 1 组  | 支持 ISO11898-1 标准协议。                                                  |
| **USB 2.0 FS** | 1 组  | 内置 PHY，支持 Device/Host 模式。                                           |

## 参考技术文档

[UinIO.com 电子技术实验室](http://uinio.com/) 为 **UINIO-MCU-HC32F460KETA** 开源项目提供了如下一系列参考技术资料：

- [《UINIO-MCU-HC32F460KETA 核心板原理图》](http://uinio.com/archives/UINIO-MCU-HC32F460KETA/UINIO-MCU-HC32F460KETA-Schematic.pdf)
- [《交互式 BOM 物料清单与 PCB 版图在线预览》](http://uinio.com/archives/UINIO-MCU-HC32F460KETA/UINIO-MCU-HC32F460KETA-BOM.html)

# UINIO-MCU-HC32F460PETB 核心板

[**UINIO-MCU-HC32F460PETB**](https://gitee.com/uinika/UINIO-MCU-HC32F460PETB) 是一款基于小华半导体 **HC32F460PETB-LQFP64** 型微控制器的核心板，该款微控制器的最大特点是支持 `1.8V ~ 3.6V` 的**宽电压范围**，和 `-40℃ ~ 105℃` 的**宽温度范围**。基于 **ARM Cortex-M4** 内核架构，最高工作频率可以达到 `200MHz`，内置有 **DSP** 数字信号处理器和 **FPU** 浮点运算单元。除此之外，还集成有 `512KB` 的 Flash 存储器，以及 `192KB` 的 SRAM 存储器。

<img src="../UINIO-MCU-HC32F460PETB/PCB-3D-1.png" width=550 />

<img src="../UINIO-MCU-HC32F460PETB/PCB-3D-2.png" width=550 />

## 设计概要

- 外部晶振电路，全部使用了打孔包地处理；
- 扩展了两路串联有自恢复保险丝的 `5V` 电源接口，整体采用覆铜处理，以提升接口的载流能力；
- 模拟电源引脚 `AVSS` 和 `AVCC` 都串联有对 `100Mhz` 高频杂散信号存在 `1KΩ` 阻抗的磁珠；
- 对调试下载接口 SWD 进行了前置处理，并且匹配了通信线序，可以方便快速的与 [**UINIO-DAPLink**](https://gitee.com/uinika/UINIO-DAPLink) 进行杜邦线连接；
- 引出了全部的 **83** 个 GPIO 端口，可以自由的使用 **8** 种常见的外设通信接口：

| 接口名称       | 数量  | 描述                                                                        |
| :------------- | :---- | :-------------------------------------------------------------------------- |
| **GPIO**       | 83 个 | `PAx`、`PBx`、`PCx`、`PDx`、`PEx`、`PHx` 一共六组。                         |
| **I2C**        | 3 组  | 支持 SMBus 协议。                                                           |
| **USART**      | 4 组  | 支持 ISO7816-3 协议。                                                       |
| **SPI**        | 4 组  | 支持 4 线式 SPI 模式和 3 线式时钟同步模式，支持全双工和只传送两种通信方式。 |
| **QSPI**       | 1 组  | 支持 `200Mbps` 高速访问的存储器控制模块。                                   |
| **I2S**        | 4 组  | 内置音频 PLL 支持音频级采样精度。                                           |
| **SDIO**       | 2 组  | 支持 SD/MMC/eMMC 格式。                                                     |
| **CAN**        | 1 组  | 支持 ISO11898-1 标准协议。                                                  |
| **USB 2.0 FS** | 1 组  | 内置 PHY，支持 Device/Host 模式。                                           |

## 参考技术文档

[UinIO.com 电子技术实验室](http://uinio.com/) 为 **UINIO-MCU-HC32F460PETB** 开源项目提供了如下一系列参考技术资料：

- [《UINIO-MCU-HC32F460PETB 核心板原理图》](http://uinio.com/archives/UINIO-MCU-HC32F460PETB/UINIO-MCU-HC32F460PETB-Schematic.pdf)
- [《交互式 BOM 物料清单与 PCB 版图在线预览》](http://uinio.com/archives/UINIO-MCU-HC32F460PETB/UINIO-MCU-HC32F460PETB-BOM.html)

# UINIO-MCU-STM32L051K8U6 核心板

[**UINIO-MCU-STM32L051K8U6**](https://gitee.com/uinika/UINIO-MCU-STM32L051K8U6) 是一款基于**意法半导体** [STM32L051K8](https://www.st.com/en/microcontrollers-microprocessors/stm32l051k8.html) 系列低功耗微控制器的核心板电路设计，该款主控芯片采用 **LQFP32** 封装，基于 **ARM Cortex-M0+** 架构，片上内置有 `64 Kbytes` 的 **Flash** 存储器，以及 `8 Kbytes` 的 **RAM** 存储器。

<img src="../UINIO-MCU-STM32L051K8U6/PCB-3D-1.png" width=500 />

<img src="../UINIO-MCU-STM32L051K8U6/PCB-3D-2.png" width=500 />

## 设计概要

1. 采用 `16 Pin` 规格的 **USB Type-C** 接口；
2. 已经将 **STM32L051K8** 微控制器的 **28** 个 **GPIO** 引脚资源悉数引出；
3. 预留有 **SOIC** 封装的 **W25Q** 型 Flash 存储器焊接位置（可选）；
4. 预留有 **3215** 封装 `32.768KHz` 频率贴片晶振的焊接位置（可选）；
5. 单独提供有 4 线制 **SWD** 下载接口，便于快速与 **DAP-Link** 连接调试；
6. 添加了 `Imax` 为 `750mA` 的自恢复保险丝，防止后级操作短路损毁芯片；

## 参考技术文档

[UinIO.com 电子技术实验室](http://uinio.com/) 为 UINIO-MCU-STM32L051K8U6 开源项目提供了如下一系列技术参考资料：

1. [《意法半导体 STM32F103 标准库典型实例》](http://uinio.com/Embedded/STM32F103/)
2. [《基于 HAL 与 LL 的 STM32F401 开发实践》](http://uinio.com/Embedded/STM32F401/)
3. [《ARM 调试工具 UINIO-DAP-Link 应用详解》](http://uinio.com/Project/UINIO-DAP-Link/)
4. [《交互式 BOM 物料清单与 PCB 版图在线预览》](http://uinio.com/archives/BOM/UINIO-MCU-STM32L051K8U6.html)

# UINIO-MCU-STM32F103C8T6 核心板

[**UINIO-MCU-STM32F103C8T6**](https://gitee.com/uinika/UINIO-MCU-STM32F103C8T6) 是一款基于 [**意法半导体**](https://www.st.com/zh/microcontrollers-microprocessors/stm32-32-bit-arm-cortex-mcus.html) **LQFP48** 封装的 **STM3232F103C8T6** 微控制器的核心板电路设计，该微控制器基于 **ARM Cortex-M3** 内核架构，主频可以达到 `72MHz`，片上载有 `64KB` 容量的 Flash 存储器和 `20Kbytes` 的 SRAM 存储器，并且拥有 3 组 `USART`，以及 CAN 接口、`USB2.0` 全速接口、12 位分辨率 `ADC/DAC`，整体上属于外设资源比较完善的高性价比主控芯片产品。

<img src="../UINIO-MCU-STM32F103C8T6/PCB-3D-1.png" width=600 />

<img src="../UINIO-MCU-STM32F103C8T6/PCB-3D-2.png" width=600 />

## 设计概要

1. 引出了意法半导体 **STM32F103C8T6** 型微控制器上面的全部 GPIO 引脚资源；
2. 单独提供有四线制的 **SWD** 下载接口，便于快速与 [UINIO-DAP-Link](http://uinio.com/Project/UINIO-DAP-Link) 建立连接；
3. 分别使用了 `8MHz` 与 `32.768KHz` 两枚贴片晶振作为系统外部时钟与实时时钟；
4. 板载 **BOOT0** 和 **BOOT1** 两枚启动配置按钮，以及一枚 **NRST** 复位按钮；
5. 模拟电源引脚 `VDDA` 使用了对 `100Mhz` 高频杂散信号存在 `1KΩ` 阻抗的**磁珠**进行单点接地；

## 启动配置

**UINIO-MCU-STM32F103C8T6** 通过板载的 `BOOT0` 和 `BOOT1` 两枚按钮来配置启动方式，默认情况下是从片上的 Flash 闪存进行启动，具体的配置信息可以参见下表：

| BOOT0 | BOOT1 | 启动方式                 |
| :---: | :---: | :----------------------- |
|  `0`  |  `X`  | 片上 Flash 闪存          |
|  `1`  |  `0`  | 系统存储器/ISP           |
|  `1`  |  `1`  | 片上 SRAM 静态随机存储器 |

## 参考技术文档

[UinIO.com 电子技术实验室](http://uinio.com/) 为 UINIO-MCU-STM32F103C8T6 开源项目提供了如下一系列技术参考资料：

1. [《意法半导体 STM32F103C8T6 标准库典型实例》](http://uinio.com/Embedded/STM32F103/)
2. [《ARM 调试工具 UINIO-DAP-Link 应用详解》](http://uinio.com/Project/UINIO-DAP-Link/)
3. [《交互式 BOM 物料清单与 PCB 版图在线预览》](http://uinio.com/archives/BOM/UINIO-MCU-STM32F103C8T6.html)

# UINIO-MCU-STM32F401CCU6 核心板

[**UINIO-MCU-STM32F401CCU6**](https://gitee.com/uinika/UINIO-MCU-STM32F401CCU6) 是一款基于 [**意法半导体**](https://www.st.com/zh/microcontrollers-microprocessors/stm32-32-bit-arm-cortex-mcus.html) **UFQFPN48** 封装的 **STM32F401CCU6** 微控制器的核心板电路设计，该微控制器基于 **ARM Cortex-M4** 内核架构，主频可以达到 `72MHz`，片上载有 `256KB` 容量的 Flash 存储器和 `64Kbytes` 的 SRAM 存储器，并且拥有 3 组 **USART** 和 3 组 **I²C** 接口，以及 4 组 **SPI** 接口与 `USB2.0` 全速控制器、12 位分辨率的 `ADC/DAC` 转换器，整体上属于高性价比、高性能的主控芯片产品。

<img src="../UINIO-MCU-STM32F401CCU6/PCB-3D-1.png" width=600 />

<img src="../UINIO-MCU-STM32F401CCU6/PCB-3D-2.png" width=600 />

> **注意**：相比较于采用 **ARM Cortex-M3** 内核架构的 **STM32F103C8T6** 等产品，使用 **ARM Cortex-M4** 内核的 **STM32F401CCU6** 携带有浮点计算单元（**FPU**，Float Point Unit），在处理数学计算时能够大幅度提升运算性能。

## 设计概要

1. 引出了意法半导体 **STM32F401CCU6** 型微控制器上面的全部 GPIO 引脚资源；
2. 单独提供有四线制的 **SWD** 下载接口，便于快速与 [UINIO-DAP-Link](http://uinio.com/Project/UINIO-DAP-Link) 建立连接；
3. 分别使用了 `8MHz` 与 `32.768KHz` 两枚贴片晶振作为系统外部时钟与实时时钟；
4. 板载 **BOOT0** 和 **BOOT1** 两枚启动配置按钮，以及一枚 **NRST** 复位按钮；
5. 模拟电源引脚 `VDDA` 使用了对 `100Mhz` 高频杂散信号存在 `1KΩ` 阻抗的**磁珠**进行单点接地；

## 启动配置

**UINIO-MCU-STM32F401CCU6** 通过板载的 `BOOT0` 和 `BOOT1` 两枚按钮来配置启动方式，默认情况下是从片上的 Flash 闪存进行启动，具体的配置信息可以参见下表：

| BOOT0 | BOOT1 | 启动方式                 |
| :---: | :---: | :----------------------- |
|  `0`  |  `X`  | 片上 Flash 闪存          |
|  `1`  |  `0`  | 系统存储器/ISP           |
|  `1`  |  `1`  | 片上 SRAM 静态随机存储器 |

## 参考技术文档

[UinIO.com 电子技术实验室](http://uinio.com/) 为 UINIO-MCU-STM32F401CCU6 开源项目提供了如下一系列技术参考资料：

1. [《基于 HAL 与 LL 的 UINIO-MCU-STM32F401 开发实践》](http://uinio.com/Embedded/STM32F401/)
2. [《ARM 调试工具 UINIO-DAP-Link 应用详解》](http://uinio.com/Project/UINIO-DAP-Link/)
3. [《交互式 BOM 物料清单与 PCB 版图在线预览》](http://uinio.com/archives/BOM/UINIO-MCU-STM32F401CCU6.html)

# UINIO-MCU-GD32F350RBT6 核心板

[**UINIO-MCU-GD32F350RBT6**](https://gitee.com/uinika/UINIO-MCU-GD32F350RBT6) 是一款基于 [**兆易创新**](https://www.gigadevice.com.cn/) 国产 **LQFP64** 封装的 **GD32F350RBT6** 微控制器的核心板电路设计，该微控制器基于 **ARM Cortex-M4** 内核架构，主频高达 `108MHz`，片上载有 `128K` 容量的 Flash 存储器，以及 `16K` 的 SRAM 存储器，并且各拥有 2 组 `USART`、`I2C`、`SPI`，以及 1 组 `I2S`、`12 位 ADC`、`12 位 DAC`，同时支持 **USB 2.0 FS OTG** 协议，总体上属于 GPIO 引脚数量较多，但是外设资源有所取舍的主控芯片产品。

<img src="../UINIO-MCU-GD32F350RBT6/PCB-3D-1.png" width=650 />

<img src="../UINIO-MCU-GD32F350RBT6/PCB-3D-2.png" width=650 />

> **注意**：相比较于采用 **ARM Cortex-M3** 内核架构的 **GD32F103C8T6** 等产品，使用 **ARM Cortex-M4** 内核的 **GD32F350RBT6** 携带有浮点计算单元（**FPU**，Float Point Unit），在处理数学计算时能够大幅度提升运算性能。

## 启动配置

**UINIO-MCU-STM32F401CCU6** 通过板载 `BOOT0` 按钮和**用户选项字节** `BOOT1_n` 位来配置启动方式，默认情况下是从片上的 Flash 闪存进行启动，具体的配置信息可以参见下表：

| BOOT0 | BOOT1_n | 启动方式                 |
| :---: | :-----: | :----------------------- |
|  `0`  |   `X`   | 片上 Flash 闪存          |
|  `1`  |   `0`   | 系统存储器/ISP           |
|  `1`  |   `1`   | 片上 SRAM 静态随机存储器 |

## 设计概要

1. 引出了兆易创新 **GD32F350RBT6** 型微控制器上面的全部 GPIO 引脚资源；
2. 单独提供有四线制的 **SWD** 下载接口，便于快速与 [UINIO-DAP-Link](http://uinio.com/Project/UINIO-DAP-Link) 建立连接；
3. 分别使用了 `8MHz` 与 `32.768KHz` 两枚贴片晶振作为系统外部时钟与实时时钟；
4. 板载一枚 **BOOT0** 启动配置按钮，以及一枚 **NRST** 复位按钮；
5. 模拟电源引脚 `VDDA` 使用了对 `100Mhz` 高频杂散信号存在 `1KΩ` 阻抗的**磁珠**进行单点接地；

## 参考技术文档

[UinIO.com 电子技术实验室](http://uinio.com/) 为 UINIO-MCU-GD32F350RBT6 开源项目提供了如下一系列技术参考资料：

1. [《兆易创新 UINIO-MCU-GD32 标准库开发指南》](http://uinio.com/Project/UINIO-MCU-GD32/)
2. [《ARM 调试工具 UINIO-DAP-Link 应用详解》](http://uinio.com/Project/UINIO-DAP-Link/)
3. [《交互式 BOM 物料清单与 PCB 版图在线预览》](http://uinio.com/archives/BOM/UINIO-MCU-GD32F350RBT6.html)

# UINIO-MCU-ESP32S3 核心板

[**UINIO-MCU-ESP32S3**](https://gitee.com/uinika/UINIO-MCU-ESP32S3) 是一款采用 [上海乐鑫科技](https://www.espressif.com.cn) **ESP32-S3** 微控制器的核心板电路设计，该微控制器基于 **Xtensa® dual-core 32-bit LX7** 架构，拥有 45 个 GPIO 接口，主频高达 `240MHz`，同时具备 **2.4GHz Wi-Fi** 与 **Bluetooth5** 两种物联网接入能力。片上载有 `384KB` 容量的 **ROM**，以及 `512KB` 容量的 **SRAM** 和 `16KB` 容量的 **RTCSRAM**。

<img src="../UINIO-MCU-ESP32S3/PCB-3D-1.png" width=700 />

<img src="../UINIO-MCU-ESP32S3/PCB-3D-2.png" width=700 />

## 设计概要

- 完整兼容官方的 [Arduino-ESP32](https://docs.espressif.com/projects/arduino-esp32/en/latest/) 板级支持包；
- 采用 LDO 低压差线性稳压芯片 `ME6211C33M5G` 提供 `3.3V` 电源；
- 预留 **TQFN** 封装的 USB 转 UART 串口芯片 **CH343P** 位置，可以按需进行贴装，不贴装时可以采用右上角的 4 线杜邦针外接串口下载模块；
- 预留有 2.4G 微带天线 **π 型阻抗匹配电路**位置，如果对于信号的收发功率没有严格要求，则可以将位号为 `L1` 的串联电感替换为 `0R` 电阻；
- 预留有 5 个 `1mm` 沉头螺丝开孔，可以用于固定主板和外壳；

## 注意事项

1. 上电之前不能下拉 `IO9/BOOT` 的电平状态，否则 **ESP32-S3** 将会进入**下载模式**；
2. `IO8` 引脚默认进行了上拉，因为如果其为低电平状态，则不能使用串口进行固件下载；
3. `GPIO11` 默认为 SPI 接口 Flash 存储器的 `VDD` 引脚，需要配置之后才能作为 GPIO 使用；
4. 外置的 `W25Q128JVSSIQ` 型 Flash 存储器，其 `VDD` 已经连接至 `3.3V` 电源，使用时无需再行配置，Flash 采用普通的两线制 SPI 总线进行通信；
5. `IO12`、`IO13` 在 **QIO** 模式下被复用为 SPI 信号线 `SPIHD` 和 `SPIWP`，本开发板采用两线制 SPI 的 **DIO** 模式，使用时需要注意将 Flash 配置为 **DIO** 模式；

## 参考技术文档

[UinIO.com 电子技术实验室](http://uinio.com/) 为 UINIO-MCU-ESP32S3 开源项目提供有如下一系列技术参考资料：

1. [《UINIO-MCU-ESP32 核心板电路设计》](http://www.uinio.com/Project/UINIO-MCU-ESP32/)
2. [《基于 UINIO-MCU-ESP32 的 Arduino 进阶教程》](http://www.uinio.com/Project/Arduino-ESP32/)
3. [《运用 U8G2 与 TFT_eSPI 玩转 UINIO-Monitor 显示屏》](http://www.uinio.com/Project/UINIO-Monitor/)
4. [《交互式 BOM 物料清单与 PCB 版图在线预览》](http://uinio.com/archives/BOM/UINIO-MCU-ESP32S3.html)

# UINIO-MCU-ESP32C3 核心板

[**UINIO-MCU-ESP32C3**](https://gitee.com/uinika/UINIO-MCU-ESP32C3) 是一款采用 [上海乐鑫科技](https://www.espressif.com.cn) **ESP32-C3** 微控制器的核心板电路设计，该微控制器基于开源的 **RISC-V** 指令集，主频高达 `160MHz`，并且同时具备有 **2.4GHz Wi-Fi** 与 **Bluetooth5** 两种无线接入能力。片上载有 `384KB` 容量的 **ROM**，以及 `400KB` 容量的 **SRAM** 和 `8KB` 容量的 **RTCSRAM**。

<img src="../UINIO-MCU-ESP32C3/PCB-3D-1.png" width=500 />

<img src="../UINIO-MCU-ESP32C3/PCB-3D-2.png" width=500 />

## 设计概要

- 完整兼容官方的 [Arduino-ESP32](https://docs.espressif.com/projects/arduino-esp32/en/latest/) 板级支持包；
- 采用 LDO 低压差线性稳压芯片 `ME6211C33M5G` 提供 `3.3V` 电源；
- 预留 **TQFN** 封装的 USB 转 UART 串口芯片 **CH343P** 位置，可以按需进行贴装，不贴装时可以采用右上角的 4 线杜邦针外接串口下载模块；
- 预留有 2.4G 微带天线 **π 型阻抗匹配电路**位置，如果对于信号的收发功率没有严格要求，则可以将位号为 `L1` 的串联电感替换为 `0R` 电阻；
- 预留有 4 个 `1mm` 沉头螺丝开孔，可以用于固定核心板；

## 注意事项

1. 上电之前不能下拉 `IO9/BOOT` 的电平状态，否则 **ESP32-C3** 将会进入**下载模式**；
2. `IO8` 引脚默认进行了上拉，因为如果其为低电平状态，则不能使用串口进行固件下载；
3. `GPIO11` 默认为 SPI 接口 Flash 存储器的 `VDD` 引脚，需要配置之后才能作为 GPIO 使用；
4. 外置的 `W25Q128JVSSIQ` 型 Flash 存储器，其 `VDD` 已经连接至 `3.3V` 电源，使用时无需再行配置，Flash 采用普通的两线制 SPI 总线进行通信；
5. `IO12`、`IO13` 在 **QIO** 模式下被复用为 SPI 信号线 `SPIHD` 和 `SPIWP`，本开发板采用两线制 SPI 的 **DIO** 模式，使用时需要注意将 Flash 配置为 **DIO** 模式；

## 参考技术文档

[UinIO.com 电子技术实验室](http://uinio.com/) 为 UINIO-MCU-ESP32C3 开源项目提供有如下一系列技术参考资料：

1. [《UINIO-MCU-ESP32 核心板电路设计》](http://www.uinio.com/Project/UINIO-MCU-ESP32/)
2. [《基于 UINIO-MCU-ESP32 的 Arduino 进阶教程》](http://www.uinio.com/Project/Arduino-ESP32/)
3. [《运用 U8G2 与 TFT_eSPI 玩转 UINIO-Monitor 显示屏》](http://www.uinio.com/Project/UINIO-Monitor/)
4. [《交互式 BOM 物料清单与 PCB 版图在线预览》](http://uinio.com/archives/BOM/UINIO-MCU-ESP32C3.html)

# UINIO-USB-Serial 串行协议转换器

[**UINIO-USB-Serial**](https://gitee.com/uinika/UINIO-USB-Serial) 是一款基于**沁恒**高速 USB 2.0 转接芯片 [**CH347T**](https://www.wch.cn/products/CH347.html) 的 USB 串行协议转换工具，支持 USB 接口转 `GPIO`、`UART`、`I²C`、`SPI`、`JTAG`, 可以用于调试 3.3V 电平的微控制器与外设的通信，也可以配合使用 [UINIO-Signal-Translator](https://github.com/uinika/UINIO-Signal-Translator) 完成 `3.3V` 到 `1.8V` 的高速信号转换，从而实现对 FPGA 芯片的调试与下载。

<img src="../UINIO-USB-Serial/PCB-3D-1.png" width=400 />

<img src="../UINIO-USB-Serial/PCB-3D-2.png" width=390 />

## 设计概要

1. 主控芯片 **CH347T** 采用了易于购买的 `TSSOP20` 封装；
2. 工作模式采用 `P1` 与 `P2` 排针的**跳线帽**进行配置；
3. 添加有 5 个 `1mm` 直径固定螺丝孔，方便与外壳进行固定组装；
4. 分类引出了 UART1 和 UART2、SPI、I²C、JTAG 五条通信总线的排针，配置好工作模式之后就可以快速接线使用；
5. 配合 [UINIO-Signal-Translator](https://gitee.com/uinika/UINIO-Signal-Translator) 可以将电平信号转换为 FPGA 芯片常用的 `1.8V`；

## 工作模式简介

**UINIO-USB-Serial** 可以支持下面的四种工作模式：

1. **USB ➞ UART**：支持两路 UART 串行接口，每一路的波特率最高可以达到 `9Mbps`。
2. **USB ➞ I²C**：处于 I²C 主设备模式，支持 4 种传输速度。
3. **USB ➞ SPI**：处于 SPI 主设备模式，最高频率可以达到 `36MHz`，并且支持 2 路片选信号线，可以分时操作两个 SPI 从设备。
4. **USB ➞ JTAG**：支持标准四线 JTAG 协议，最高频率可以达到 `18Mbit/s`。

## 工作模式配置

这些模式分别由 **CH347T** 的 `DTR1` 和 `RTS1` 引脚的电平状态进行控制：

| 排针 P1  | 排针 P2  | 工作模式                |
| -------- | -------- | ----------------------- |
| `低电平` | `低电平` | UART1 + JTAG            |
| `高电平` | `高电平` | UART1 + UART0           |
| `高电平` | `低电平` | UART1 + SPI + I2C (HID) |
| `低电平` | `高电平` | UART1 + SPI + I2C (VCP) |

## 参考技术文档

[UinIO.com 电子技术实验室](http://uinio.com/) 为 UINIO-USB-Serial 开源项目提供了如下一系列技术参考资料：

- [《交互式 BOM 物料清单与 PCB 版图在线预览》](http://uinio.com/archives/BOM/UINIO-USB-Serial.html)

# UINIO-USB-UART 串口调试器

[**UINIO-USB-UART**](https://gitee.com/uinika/UINIO-USB-UART) 是一款分别基于[**苏州沁恒 CH343P**](https://www.wch.cn/products/CH343.html) 和[**美国芯科 CP2102**](https://www.silabs.com/interface/usb-bridges/classic/device.cp2102) 芯片的 **USB** 转 **UART** 的开源串口调试器电路设计，两款芯片都可以稳定的支持 `921600` 波特率通信。

<img src="../UINIO-USB-UART/PCB-3D-1.png" width=350 />

<img src="../UINIO-USB-UART/PCB-3D-2.png" width=350 />

## 设计概要

1. 板载 `RXD` 和 `TXD` 的信号读写指示灯；
2. 引出了包括**串口硬件流控信号线**在内的全部片上资源；
3. 增加 **1206** 封装的**自恢复保险丝**，为后级电路提供短接保护；
4. 使用 **16 Pin** 的 **USB Type-C** 接口，并且采用了 PCB 拼板设计；
5. 预留有 `1mm` 的固定螺丝孔，便于安装至 3D 打印外壳，或者搭建成套的产品原型；
6. 通过为 **UINIO-USB-UART-CH343P** 的 `VIN` 引脚提供参考电压，可以调整 UART 收发的电平信号幅值。

## 参考技术文档

[UinIO.com 电子技术实验室](http://uinio.com/) 为 UINIO-USB-UART 开源项目提供了如下一系列技术参考资料：

- [《交互式 BOM 物料清单与 PCB 版图在线预览》](http://uinio.com/archives/BOM/UINIO-USB-UART.html)

# UINIO-Power-LDO 线性稳压器模组

[**UINIO-Power-LDO**](https://gitee.com/uinika/UINIO-Power-LDO) 是一款同时支持 **XC6206**、**ME6211**、**SGM2019**、**AMS1117** 四种常用线性稳压芯片的测试模组，采用四合一拼板设计，可以拆分单独使用。

<img src="../UINIO-Power-LDO/PCB-3D-1.png" width=600 />

<img src="../UINIO-Power-LDO/PCB-3D-2.png" width=600 />

## 应用介绍

1. **XC6206** 模组：选用 **SOT-23-3** 封装，兼容**特瑞仕** `XC6206` 系列低压差线性稳压器。
2. **ME6211** 模组：选用 **SOT-23-5** 封装，兼容**微盟** `ME6211` 系列低压差线性稳压器。
3. **SGM2019** 模组：选用 **SOT-23-5** 封装，兼容**圣邦微** `SGM2019` 系列低压差线性稳压器。
4. **AMS1117** 模组：选用 **SOT-223-3** 封装，可以兼容**固定电压**版本的**艾迈斯** `AMS1117`、**德州仪器** `REG1117` 线性稳压器。

> **注意**：每一片模组都单独添加了 `2mm` 直径的非金属化固定螺丝孔。

## 设计概要

1. 采用了 6 Pin 的 **USB Type-C**，并且 `CC1` 和 `CC2` 分别添加了 `5.1kΩ` 下拉电阻，可以更好的兼容具备**功率传输协议 USB-PD**（USB Power Delivery）的电源；
2. 使用 `0.7mm` 线宽 `0.3mm` 线距、`0.8mm` 过孔 `0.3mm` 孔径进行 PCB 布线，在温升 10℃ 的情况下，最大负载电流为 `1.6A` 左右，如果需要换用其它型号的线性稳压芯片，需要注意其最大输出电流不能超过该值。
3. 支持使用 `2Pin` 的杜邦针作为电源输入端口，而 `4Pin` 的杜邦针作为两路的电源输出端口。
4. 添加有一枚用于防止**输入端**反接的 **1N5819** 肖特基二极管（最大整流电流 `1A`，最大反向工作电压 `40V`），采用大尺寸的 **SOD-123** 封装，或者也可以选择载流能力达到 `3A` 的 **1N5822**。
5. 肖特基二极管和 `4Pin` 杜邦针两端，分别添加有两组测试点，便于测量输入输出的电源纹波。

> **注意**： **AMS1117** 模组的输出电容，必须采用**等效串联电阻 ESR**（Equivalent Series Resistance）更大的 `22uF` **钽电容**，从而确保输出的稳定性。

## 参考技术文档

[UinIO.com 电子技术实验室](http://uinio.com/) 为 **UINIO-Power-LDO** 开源项目提供了如下一系列技术参考资料：

- [《常见 LDO 线性稳压芯片的对比选型》](http://uinio.com/Electronics/LDO/)
- [《交互式 BOM 物料清单与 PCB 版图在线预览》](http://uinio.com/archives/BOM/UINIO-Power-LDO.html)

# UINIO-Storage 低速存储器模组

[**UINIO-Storage**](https://gitee.com/uinika/UINIO-Storage) 是一款同时支持 **EEPROM**、**Flash**、**MicroSD** 三种类型存储器的多功能模组，采用了拼板设计，每一片模组都添加有独立的 `1mm` 直径固定螺丝孔，可以单独拆分进行使用。

<img src="../UINIO-Storage/PCB-3D-1.png" width=500 />

<img src="../UINIO-Storage/PCB-3D-2.png" width=500 />

## 应用介绍

1. **EEPROM 存储器** `AT24Cxxx`：支持 SOIC 和 TSSOP 两种封装形式，使用 I²C 总线通信。
2. **Flash 存储器** `W25Qxxx`：支持 SOIC 和 WSON 两种封装形式，使用 SPI 总线通信。
3. **MicroSD 读卡器**：同时支持 `SPI` 和 `SDIO` 两种通信方式，独立 `5V` 线性稳压芯片供电，支持读写大容量 TF 卡。

> **注意**： 针对每个模组都进行了单独的分区覆铜，其中两片 AT24Cxxx EEPROM 模组分别被配置为不同的 I²C 地址。

## 设计概要

1. 每一片模组都单独添加有 `1mm` 直径的固定螺丝孔；
2. 每一片模组的 `3.3V` 外部供电端都添加了 `0.1uF` 滤波电容；
3. 已经为 **EEPROM** 存储器的 I²C 总线添加了 `10KΩ` 的上拉电阻；
4. 为了提升 **MicroSD 读卡器** 在读取大容量存储卡时的电流驱动能力，单独添加了一枚 `3.3V` 线性稳压芯片进行供电；
5. 配合**串行协议转换器** [UINIO-USB-Serial](https://gitee.com/uinika/UINIO-USB-Serial) 以及相应的上位机程序，可以方便的对模组上的存储器进行读写操作；

## 参考技术文档

[UinIO.com 电子技术实验室](http://uinio.com/) 为 UINIO-Storage 开源项目提供了如下一系列技术参考资料：

- [《交互式 BOM 物料清单与 PCB 版图在线预览》](http://uinio.com/archives/BOM/UINIO-Storage.html)

# UINIO-Signal-Translator 电平转换器

[**UINIO-Signal-Translator**](https://gitee.com/uinika/UINIO-Signal-Translator) 是一款基于德州仪器 TSSOP 封装的 [**TXS0108**](https://www.ti.com.cn/product/cn/TXS0108E) 以及 [**TXB0108**](https://www.ti.com.cn/product/cn/TXB0108) 的双向电平信号转换器模组，适用于漏极开路或者推挽输出的应用，支持 `1.8V`、`2.5V`、`3.3V`、`5V` 等常见信号电平之间的相互转换。

<img src="../UINIO-Signal-Translator/PCB-3D-1.png" width=420 />

<img src="../UINIO-Signal-Translator/PCB-3D-2.png" width=420 />

## 设计概要

1. 输出使能端 **OE** 需要通过**跳线帽**进行配置；
2. 分别为参考电压 A 与参考电压 B 添加了 LED 指示灯；
3. 增加了 4 个 `1mm` 直径固定螺丝孔，方便与外壳进行固定组装；
4. 转换芯片均采用易于购买的 `TSSOP20` 封装，可以按需使用 **TXS0108** 或者 **TXB0108**；
5. 可以配合串行协议转换器 [UINIO-USB-Serial](https://gitee.com/uinika/UINIO-USB-Serial) 使用，用于调试 `1.8V` 电平信号的 FPGA 芯片外设；

## 输入输出参数

- **TXB0108**：`VCCA` 端电压 `1.2V ~ 3.6V`，`VCCB` 端电压 `1.65V ~ 5.5V`，使能端 `OE` 高电平有效。不能用于 I²C 的开漏输出，只适用于 **UART** 与 **SPI** 总线通信场景。
- **TXS0108**：`VCCA` 端电压 `1.4V ~ 3.6V`，`VCCB` 端电压 `1.65V ~ 5.5V`，使能端 `OE` 高电平有效，同时支持开漏与推挽输出（推挽模式下最大数据速率可以达到 `110Mbps`，开漏模式下则只能达到 `1.2Mbps`），可以同时适用于 **UART**、**I²C**、**SPI** 等总线通信场景。

> **注意**： **TXS0108** 和 **TXB0108** 两款芯片只能完成逻辑电平信号的转换，其驱动能力较小，并不具备带负载能力。

## 参考技术文档

[UinIO.com 电子技术实验室](http://uinio.com/) 为 UINIO-Signal-Translator 开源项目提供了如下一系列技术参考资料：

- [《交互式 BOM 物料清单与 PCB 版图在线预览》](http://uinio.com/archives/BOM/UINIO-Signal-Translator.html)

# UINIO-Monitor 显示屏幕模组

[**UINIO-Monitor**](https://gitee.com/uinika/UINIO-Monitor) 是一款同时拼接了 **0.96 英寸 LCD 显示屏**（`ST7735`，`160×80`）、**0.96 英寸 OLED 显示屏**（`SSD1315`，`128×64`）、**1.3 英寸 LCD 显示屏**（`ST7789`，`240×240`）、**2.4 英寸 LCD 显示屏**（`ST7789`，`240×320`）、**1.69 英寸 LCD 显示屏**（`ST7789`，`240×280`） 的五合一屏幕驱动电路设计。

<img src="../UINIO-Monitor/PCB-3D-1.png" width=550 />

<img src="../UINIO-Monitor/PCB-3D-2.png" width=550 />

## 设计概要

1. 采用 **FreeCAD** 绘制了合理并且美观的板框（长度与宽度均小于或等于 `10cmm`）；
2. 分别提供有 4 个 `1mm` 直径螺丝孔，便于安装至其它结构件，快速搭建出产品原型；
3. **LCD** 屏幕的外接引脚**线序**全部保持统一，并且重要的**丝印**信息会同时标注在 PCB 的**顶层**与**底层**；
4. PCB 板载 `0.5mm` 间距的 **FPC** 柔性排线连接器，同时还引出了 `2.54mm` 间距的直插排针，便于通过杜邦线快速搭建实验电路；
5. 由于 **OLED** 屏幕的功耗相对较小，因而采用了 `300mA` 输出的线性稳压芯片 `XC6206P332MR`；而功耗相对较大的 **LCD** 屏幕，则统一采用 `ME6211C33M5G-N` 线性稳压芯片；

## 注意事项

1. 工程的 `CAD` 目录下，保存的是 **FreeCAD** 绘制的 PCB 板框草图文件；
2. 工程的 `3D Models` 文件夹，保存的是 LCD 和 OLED 裸屏的 **3D** 模型 **FreeCAD** 源文件；
3. 工程的 `Reference` 目录下提供了裸屏相关的数据手册以及参考原理图；
4. **0.96 英寸 OLED 显示屏** 同时兼容采用 `SSD1306` 和 `SSD1315` 两款驱动芯片的屏幕；
5. 由于 `XC6206P332MR` 电源正负极反接时，极易导致线性稳压芯片烧毁，所以串联 **SOD-323** 封装的肖特基二极管防止反接；
6. 当使用 **Arduino** 的 **U8g2** 库驱动 **0.96 英寸 OLED 显示屏** 的时候，必须焊接上 `R20` 电阻，而 `R19` 电阻位置可以留空；

## 参考技术文档

[UinIO.com 电子技术实验室](http://uinio.com/) 为 UINIO-Monitor 开源项目提供有如下一系列技术参考资料：

1. [《基于 UINIO-MCU-ESP32 的 Arduino 进阶教程》](http://www.uinio.com/Project/Arduino-ESP32/)
2. [《运用 U8G2 与 TFT_eSPI 玩转 UINIO-Monitor 显示屏》](http://www.uinio.com/Project/UINIO-Monitor/)
3. [《交互式 BOM 物料清单与 PCB 版图在线预览》](http://uinio.com/archives/BOM/UINIO-Monitor.html)

# UINIO-Logic-24MHz 逻辑分析仪

[**UINIO-Logic-24MHz**](https://gitee.com/uinika/UINIO-Logic-24MHz) 是一款基于**英飞凌**（已收购**赛普拉斯 Cypress**）的 [**CY7C68013A**](https://www.infineon.com/cms/en/product/universal-serial-bus-usb-power-delivery-controller/peripheral-controllers/ez-usb-fx2lp/cy7c68013a-56ltxit/) 型 `USB2.0` 控制器，以及 [**Sigork**](https://sigrok.org/) 开源固件方案的逻辑分析仪电路设计。拥有 `24MHz` 采样频率，以及 **8** 个采样通道。

<img src="../UINIO-Logic-24MHz/PCB-3D-1.png" width=450 />

<img src="../UINIO-Logic-24MHz/PCB-3D-2.png" width=450 />

## 设计概要

1. 采用 **USB Type-C** 接口，以及 `10 Pin` 的牛角插座；
2. **CY7C68013A** 型 USB 控制器芯片采用了体积较小的 `QFN56` 封装；
3. **AT24C64** 微芯 EEPROM 存储器芯片同样采用体积小巧的 `TSSOP8` 封装；
4. 板载 `24MHz` 无源贴片晶振，阻容贴片元件全部采用 `0402` 的小规格封装；
5. 增加具有**三态输出**功能的 **74HC245** 八路信号收发器，提升信号采集的稳定性；
6. 低压差线性稳压器可以灵活选用 `ME6211C33M5G` 或者 `A6303AE5R-33A` 等 `SOT23-5` 封装的 **LDO** 芯片；

## 注意事项

- LED 指示灯 `D2` 连接至 **CY7C68013A** 的 `PA0` 引脚，而 `D3` 则被连接至 `PA1` 引脚；
- 需要结合 **Sigork** 的开源固件 [sigrok-firmware-fx2lafw](https://github.com/wuxx/sigrok-firmware-fx2lafw)，并且搭配 [PulseView](https://sigrok.org/wiki/Downloads) 上位机协同使用；

## 参考技术文档

[UinIO.com 电子技术实验室](http://uinio.com/) 为 UINIO-Logic-24MHz 开源项目提供了如下一系列技术参考资料：

- [《快速上手 UINIO-Logic-24MHz 逻辑分析仪》](http://uinio.com/Project/UINIO-Logic-24MHz/)
- [《交互式 BOM 物料清单与 PCB 版图在线预览》](http://uinio.com/archives/BOM/UINIO-Logic-24MHz.html)

# UINIO-Keyboard 多功能输入模组

[**UINIO-Keyboard**](https://gitee.com/uinika/UINIO-Keyboard) 是一款基于[**江苏恒沁 CH452**](https://www.wch.cn/product/CH452.html) 的 64 位键盘输入装置，采用两线制的 **I²C** 总线通信接口，并且外扩有[**日本阿尔卑斯阿尔派（ALPSALPINE）**](https://www.alpsalpine.com/) 的 3 枚 **EC11** 旋转编码器、以及 1 枚 **RKJXV** 模拟量碳膜摇杆，基本覆盖了嵌入式开发当中主流的实体输入方案。

<img src="../UINIO-Keyboard/PCB-3D-1.png" width=500 />

<img src="../UINIO-Keyboard/PCB-3D-2.png" width=500 />

## 设计概要

1. 添加了六个 `3mm` 直径开孔，便于安装**铜柱**；
2. 键盘统一采用 `3 × 4 × 2.5` 规格的四脚贴片按键；
3. 碳膜摇杆可以替换为国产的 [**广东控银 JP13**](http://www.k-silver.com/c_html_products/jp13heisedaikaiguan-825.html) 型摇杆；
4. **键盘**、**旋转编码器**、**模拟量摇杆**分别拥有各自独立的 LED 电源指示灯；
5. 关于 64 位键盘的具体键位编码，可以参考官方的[**《数码管驱动及键盘控制芯片 CH452》**](https://www.wch.cn/downloads/CH452DS1_PDF.html) 数据手册；

## 参考技术文档

[UinIO.com 电子技术实验室](http://uinio.com/) 为 UINIO-Keyboard 开源项目提供了如下参考技术资料：

- [**《交互式 BOM 物料清单与 PCB 版图在线预览》**](http://uinio.com/archives/BOM/UINIO-Keyboard.html)

# UINIO-DAP-Link 下载调试器

[**UINIO-DAP-Link**](https://gitee.com/uinika/UINIO-DAP-Link) 是一款基于 [**ARM DAP Link**](https://daplink.io/) 开源固件的硬件下载调试电路设计，采用了 `LQFP48` 封装的 **STM32F103CBT6** 或者 **STM32F103C8T6** 微控制器作为主控芯片，同时也兼容其它 `Pin to Pin` 的 **Cortex-M3** 微控制器（需要自行调整固件）。

<img src="../UINIO-DAP-Link/PCB-3D-1.png" width=700 />

<img src="../UINIO-DAP-Link/PCB-3D-2.png" width=700 />

## 设计概要

1. 采用 **USB Type-C** 接口以及 **3225** 封装的贴片晶振；
2. 提供 **SWD/JTAG** 转换板，以及清晰合理的符号标识；
3. 低压差线性稳压器 **LDO** 调整为 `ME6211C33M5G` 方案；
4. 兼容 [ARMmbed DAPLink](https://github.com/ARMmbed/DAPLink/releases/tag/v0257) 提供的 `REL v0257` 最新版本固件；
5. 预留 `1mm` 和 `2mm` 直径固定螺丝孔，方便与外壳进行固定；
6. 工程中的 `Firmware` 目录提供有已编译的最新 **DAPLink 0258** 版本固件的 `Bootloader` 以及 `Interface`；

## 参考技术文档

[UinIO.com 电子技术实验室](http://uinio.com/) 为 UINIO-DAP-Link 开源项目提供了如下一系列技术参考资料：

- [**《ARM 调试工具 UINIO-DAP-Link 应用指南》**](http://uinio.com/Project/UINIO-DAP-Link/)：介绍 UINIO-DAP-Link 在 **STM32CubeIDE** 以及 **Keil µVision** 开发环境当中的使用，以及 DAPLink 固件的下载更新方法。
- [**《交互式 BOM 物料清单与 PCB 版图在线预览》**](http://uinio.com/archives/BOM/UINIO-DAP-Link.html)：介绍了 UINIO-DAP-Link 硬件 PCB 所涉及的物料清单，并且还提供了布线的预览。

# UINIO-Cubic-Prism 分光棱镜显示器

[**UINIO-Cubic-Prism**](https://gitee.com/uinika/UINIO-Cubic-Prism) 是一款基于 **上海乐鑫科技** [ESP32-PICO-D4](https://products.espressif.com/) 主控芯片，以及**日本 TDK 株式会社** 的 [MPU6050](https://invensense.tdk.com/products/motion-tracking/6-axis/mpu-6050/) 加速度传感器的分光棱镜显示设备。

## 工程目录说明

```
├─Documents               电路原理图以及动态 BOM 文件
├─CAD                     3D 打印模型文件
│  ├─GCode                Cura 切片文件，仅适用于型号为 Vyper 的 3D 打印机
│  └─STL                  模型 STL 文件
├─Firmware                开源固件
├─Gerbers                 用于加工 PCB 电路板的光绘文件
├─Images                  README 图片素材
├─Libraries               KiCAD 原理图库、封装库、3D 模型库
│  ├─Uinika.3D
│  └─Uinio.Footprint
└─Tools                   固件烧写工具、屏幕共享工具、图片格式转换工具
```

> **注意**：该工程分别在 **USB Type-C** 的 `CC1` 和 `CC2` 引脚，添加了 `R13` 和 `R14` 两枚下拉电阻（原始开源项目缺失），从而能够支持 USBPD 快充协议。

## 设计概要

<img src="../UINIO-Cubic-Prism/PCB-3D-1.png" width=650 />

<img src="../UINIO-Cubic-Prism/PCB-3D-2.png" width=650 />

- 天线屏蔽使用 2 排接地过孔（省略了阻抗匹配电路）；
- 完全兼容 **Github** 上的 [HoloCubic_AIO](https://github.com/ClimbSnail/HoloCubic_AIO) 固件及其相关工具；
- 电路原理图进行了重绘，同时 PCB 也重新进行了手工布线，尽可能多的采用大面积铺铜；
- 更换了 TF 卡插座为更加便宜并且比较容易购买的封装形式；
- 同时提供有 `AMS1117-3.3` 和 `ME6211C33M5G` 两款线性稳压器芯片的屏幕显示模组，便于拼板打样；
- 屏幕**扩展板**与**主板**所使用线性稳压芯片的 `3.3V` 完全隔离（多个稳压器不能像原始开源项目当中那样，被简单的并联起来使用）；
- 屏幕**扩展板**与**主板**采用 `10cm` 长度的 `8Pin` **同向 FPC 软排线**进行连接；

## 参考技术文档

[UinIO.com 电子技术实验室](http://uinio.com/) 提供有 UINIO-Cubic-Prism 开源项目的 [**《交互式 BOM 物料清单与 PCB 版图在线预览》**](http://uinio.com/archives/BOM/UINIO-Cubic-Prism.html)，以及如下一系列相关技术的参考资料：

1. [《UINIO-MCU-ESP32 核心板电路设计》](http://www.uinio.com/Project/UINIO-MCU-ESP32/)
2. [《基于 UINIO-MCU-ESP32 的 Arduino 进阶教程》](http://www.uinio.com/Project/Arduino-ESP32/)
3. [《运用 U8G2 与 TFT_eSPI 玩转 UINIO-Monitor 显示屏》](http://www.uinio.com/Project/UINIO-Monitor/)
4. [《交互式 BOM 物料清单与 PCB 版图在线预览》](http://uinio.com/archives/BOM/UINIO-Cubic-Prism.html)

## CAD 外壳模型

工程当中的 `CAD` 目录，是专门为 [**UINIO-Cubic-Prism**](https://gitee.com/uinika/UINIO-Cubic-Prism) 重新设计的 3D 打印外壳模型，可以精确适配本项目的 PCB 板框；分光棱镜分别采用左右两个延伸柱进行固定，免去使用胶水粘结到屏幕上的麻烦。

<img src="../UINIO-Cubic-Prism/Sheel-1.png" width=450 />

CAD 模型被划分为上下两个部分（对应 FreeCAD 工程当中的 `Base` 和 `Cover` 两个零件），分别用于安装**主板**与**屏幕扩展板**。

<img src="../UINIO-Cubic-Prism/Sheel-2.png" width=450 />

CAD 外壳模型的分光棱镜倾斜角度，被提高至 30° 度，从而改善水平放置在桌面时的可视角度。同时对模型底部进行了掏空处理，提升主板的散热能力，同时也便于插拔 TF 卡。

<img src="../UINIO-Cubic-Prism/Sheel-3.png" width=450 />

RGB 发光二极管对应的外壳位置，专门进行了削薄处理，便于启动时观察其工作状态。左右两侧预留有 `2mm` 直径的沉头螺丝开孔以及相应的装饰盖（需要使用胶水粘接）。

## 固件与工具

|           名称           | 下载地址                                            | 描述                                                                                  |
| :----------------------: | :-------------------------------------------------- | :------------------------------------------------------------------------------------ |
|    **HoloCubic AIO**     | https://github.com/ClimbSnail/HoloCubic_AIO         | 兼容 [**UINIO-Cubic-Prism**](https://gitee.com/uinika/UINIO-Cubic-Prism) 的开源固件。 |
|  **HoloCubic AIO Tool**  | https://github.com/ClimbSnail/HoloCubic_AIO_Tool    | 固件烧录工具、图片与视频转换工具。                                                    |
| **LVGL Image Converter** | https://github.com/W-Mai/lvgl_image_converter       | 基于 LVGL 的图片转换工具。                                                            |
|    **ESP32 投屏工具**    | https://gitee.com/superddg123/esp32-TFT/tree/master | 运行在电脑上的 ESP32 投屏上位机。                                                     |
|     **天气时钟 API**     | https://www.tianqiapi.com/                          | 内置的天气时钟 API 服务申请地址。                                                     |

# UINIO-Peg-Board 洞洞实验板

[**UINIO-Peg-Board**](https://gitee.com/uinika/UINIO-Peg-Board) 是一款**长度**和**宽度**均等于 `10cm`，焊盘间距保持在 `2.54mm` 的万用 PCB 洞洞实验板，可以用来方便的搭建一些接插元件测试电路。

<img src="../UINIO-Peg-Board/PCB-3D-1.png" width=450 />

## 设计概要

1. 板框上下左右四个角上都分别制作有 `3cm` 的固定螺丝孔；
2. PCB 板框的 4 个边角分别进行了 `5cm` 直径的圆角处理；
3. 建议使用黑色磨砂材质的阻焊油墨，打样之后的视觉效果更佳；
4. 工程的 `Edge` 目录下面是使用 **FreeCAD** 绘制的板框；
5. 通过修改洞洞板 [**UinIO.com**](www.uinio.com) 丝印下面的 `Version 1.0.1` 版本号，可以规避 PCB 制造工厂的光绘文件重复性检查；

## 参考技术文档

[UinIO.com 电子技术实验室](http://uinio.com/) 为 UINIO-Peg-Board 开源项目提供有如下一系列技术参考资料：

1. [《PCB 基本布线规范与设计原则》](http://uinio.com/Electronics/PCB-Principle/)
2. [《开源 EDA 工具 KiCad 6.0 电路设计小书》](http://uinio.com/Electronics/KiCad-Tutorial/)
3. [《交互式 BOM 物料清单与 PCB 版图在线预览》](http://uinio.com/archives/BOM/UINIO-Peg-Board.html)

<style>
h1.title {
  color: #8C634F;
  border: 2px dotted #8C634F;
  width: 100%;
  font-size: 2.2rem !important;
  font-weight: bold;
  display: block;
  border-radius: 1rem;
  padding: 1rem 2rem;
  margin: 0 auto 1.5rem 0 !important;
  font-family: Monda;
}
</style>
