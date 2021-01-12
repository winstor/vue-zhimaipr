// import 组件
export default function(component) {
  switch (component) {
    case 'Layout':
      return require('@/layout').default
    case 'layout':
        return require('@/layout').default
    case 'Test':
      return require('@/layout').default
    default:
      return require('@/views/' + component + '/index').default
  }
}
