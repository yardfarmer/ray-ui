# rax-starter-kit

## Getting Started

### `npm run start`

Runs the app in development mode.

Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

The page will reload if you make edits.


## API

### Radio

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
checked | 是否选中,group中的选中不适用该API，而是通过value设置 | boolean |
disabled | 是否禁用 | boolean | false |
size | 大小  | string(small,medium) | medium
onChange | 点击造成状态改变时的回调函数，group使用时，单个item上不存在此回调 | function(checked,e) |
type     | 单选框类型 |string（'normal'，'list', 'empty'）| normal |

`注意：w3c标准中的radio在非受限场景不能取消选中。`

### Radio.group

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
value | 当前选择的值 | any | ''
onChange | 选中值发生改变后的回调 | function(value,e) | ()=>{}
dataSource | 可选数据源 | array | []
