/*给store/index.js调用的,这里有新增,修改,删除等方法*/
// 存储本地的数据名称
var key = 'GOODS'
//获取本地存储的数据(字符串),并转成对象(如果有值就获取,没有就返回一个空对象)
// 保存本地数据形式{88: 1, 90: 3}
const getLocalGoods = () => {
  return JSON.parse(localStorage.getItem(key) || '{}')
}
// 加入购物车后把加入的商品id和数量存入本地
const addLocalGoods = goods => {
  /** const goods = {goodsId: this.$route.params.goodsId,count: this.buyCounnt}*/
  // 获取本地存取的值,对象
  const localGoods = getLocalGoods()
  // 对传递过来的goods.goodsID进行判断,如果已经在本地对象中,把对应数量累加,不存在添加到本地
  if (localGoods[goods.goodsId]) {
    // 如果存在(改变对象中ID的值)
    localGoods[goods.goodsId] += goods.count
  } else {
    // 如果不存在(就给对象添加值)
    localGoods[goods.goodsId] = goods.count
  }
  // 把对象转成字符串,覆盖保存回去
  localStorage.setItem(key, JSON.stringify(localGoods))
  // 重新统计一下localStorage中最新的数量,返回
  return getTotalCount()
}
// 修改本地商品信息
// {goodsId:88,count:3}
const updateLocalGoods = goods => {
  // 获取本地存储的数据
  const localGoods = getLocalGoods()
  // 更改本地商品信息
  localGoods[goods.goodsId] = goods.count
  // 把对象转成字符串,覆盖保存回去
  localStorage.setItem(key, JSON.stringify(localGoods))
  // 重新统计一下localStorage中最新的数量,返回
  return getTotalCount()
}
// 删除本地商品
const deleteLocalGoods = goodsId => {
  // 获取本地存储的数据
  const localGoods = getLocalGoods()
  //  删除id对应的商品
  delete localGoods[goodsId]
  // 把对象转成字符串,覆盖保存回去
  localStorage.setItem(key, JSON.stringify(localGoods))
  // 重新统计一下localStorage中最新的数量,返回
  return getTotalCount()
}

// 统计购物车总数量
const getTotalCount = () => {
  //  定义一个变量用于存放总数
  let totalCount = 0
  //  获取本地存储的数据
  const localGoods = getLocalGoods()
  // 将数据中的总商品数量计算出来
  for (var key in localGoods) {
    totalCount += localGoods[key]
  }
  return totalCount
}
//导出 不加default就是按需导出
export {
  addLocalGoods,
  updateLocalGoods,
  deleteLocalGoods,
  getTotalCount,
  getLocalGoods
}
