<template>
  <div class="home">
    <div class="content">
      <div class="box1">
        <h2>大屏数据可视化</h2>
      </div>
      <div class="box2">第2个</div>
      <div class="box3">第3个</div>
      <div class="box4">第4个</div>
      <div class="box5">第5个</div>
      <div class="box6">第6个</div>
      <div class="box7">第7个</div>
      <div class="box8">第8个</div>
      <div class="box9">第9个</div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang='less' scoped>
.home {
  height: 100%;
  .content {
    // 网格布局
    display: grid;
    // 设置行/列数，每一个行/列占的份数
    grid-template-columns: repeat(3, 1fr);
    // grid-template-rows: repeat(3, 1fr);
    grid-template-rows: 50px 1fr 2fr 1fr;
    // 网格间距
    gap: 10px;
    width: 100%;
    height: 100%;
    .box1 {
      grid-column: span 3;
      h2 {
        text-align: center;
        margin: 0;
        line-height: 32px;
        color: #000;
        font-size: 20px;
        font-weight: bold;
      }
    }
    .box8 {
      // 跨列
      grid-column: span 2;
    }
  }
}
</style>