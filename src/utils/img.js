// 图片的模块化管理

// 应用程序中的图片来源
// 1-来自远程服务器：当图片比较大时，建议放在public目录
// 2-来自本地assets目录：当图片很小时，建议放在assets中
// 3-来自本地静态资源服务器public目录

// 放在public中的图片，是不会被webpack处理的。所以项目中使用到的大图片，一定要放在public中，以方便最终项目上线做图片优化。
// 放在assets中的图片，会被webpack处理，一般小图片放在该目录，这些图片一般不需要做优化，融合代码一部分。
// 在代码中，尽量减少background-image的使用

// 把assets中的图片资源，当作模块导入进来
import logo from '@/assets/img/logo.png'

const imgBaseUrl = 'http://localhost:9000'
const pubBaseUrl = '/images'  // 指向本地的静态资源服务器

export default {
  // 从远程图片服务上导入的图片路径
  feedIcon: imgBaseUrl+'/jdphoto/jfs/t9715/362/323851365/1279/81de6d72/59cc5903N7d14ca0e.png',
  appIcon: imgBaseUrl+'/jdphoto/jfs/t9196/304/2362310772/2730/775aea35/59cc5931Nd495934f.png',
  loginIcon: imgBaseUrl+'/jdphoto/jfs/t9052/339/2338090052/1443/912da0a4/59cc5951N10f8f9b3.png',
  // 从本地静态资源服务器中导入的图片路径
  logo2: pubBaseUrl + '/logo.png',
  // 从src源码中导入的图片模块
  logo,
  imgBaseUrl
}
