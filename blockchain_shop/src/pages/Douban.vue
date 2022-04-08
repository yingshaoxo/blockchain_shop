<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";

const dict = reactive({
  data: {
    category_list:
      "热门 最新 经典 可播放 豆瓣高分 冷门佳片 华语 欧美 韩国 日本 动作 喜剧 爱情 科幻 悬疑 恐怖 治愈".split(" ")
    ,
    sort_selection: 1,
    movies: [
      {
        name: "A Nice Movie",
        picture: "https://m.media-amazon.com/images/M/MV5BNjY0MGEzZmQtZWMxNi00MWVhLWI4NWEtYjQ0MDkyYTJhMDU0XkEyXkFqcGdeQXVyODc0OTEyNDU@._V1_FMjpg_UX1000_.jpg",
        score: "9.1",
      }
    ],
    pagination: {
      currentPage: 1,
      totalPageNumber: 500
    }
  },
  functions: {
  }
})

onMounted(async () => {
  for (let i = 1; i <= 2; i++) {
    dict.data.movies = [...dict.data.movies, ...dict.data.movies]
  }
});
</script>

<template>
  <div class="bigBox">
    <div class="header">
      <div class="pageFunctionLabel">选电影</div>
      <div class="categorySelection">
        <div class="categoryTag" v-for="category in dict.data.category_list">{{ category }}</div>
      </div>
      <a-radio-group class="sortSelectionRow" v-model:value="dict.data.sort_selection">
        <a-radio :value="1">按评价排序</a-radio>
        <a-radio :value="2">按时间排序</a-radio>
      </a-radio-group>
    </div>

    <div class="bodyListLayout">
      <div class="bodyList">
        <div class="bodyItem" v-for="movie in dict.data.movies">
          <div class="bodyItemPicture">
            <img :src="movie.picture" />
          </div>
          <div class="bodyItemDescriptionBox">
            <div class="bodyItemName">{{ movie.name }}</div>
            <div class="bodyItemScore">{{ movie.score }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="loadMoreButton">加载更多</div>
  </div>
</template>

<style lang="scss">
.bigBox {
  text-align: left;

  .header {
    .pageFunctionLabel {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .categoryTag {
      display: inline-block;
      margin: 5px;
      padding: 5px;
      border: 1px solid #ccc;
      border-radius: 5px;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        background-color: #ccc;
      }
    }

    .sortSelectionRow {
      display: flex;
      justify-content: flex-start;
      margin-top: 10px;
    }
  }

  .bodyListLayout {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-top: 10px;

    .bodyList {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;
      flex-wrap: wrap;
      margin-top: 10px;

      .bodyItem {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        // margin-left: 20px;
        margin-right: 20px;
        margin-bottom: 20px;
        height: 200px;
        border: 1px solid #ccc;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.3s;

        &:hover {
          background-color: #ccc;
        }

        .bodyItemPicture {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: flex-start;
          width: 100%;
          height: 150px;
          border-radius: 5px;

          img {
            width: 100%;
            height: 100%;
            border-radius: 5px;
          }
        }

        .bodyItemDescriptionBox {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 80px;

          .bodyItemName {
            font-size: 12px;
            font-weight: bold;
            color: #37a;
          }

          .bodyItemScore {
            font-size: 11px;
            font-weight: bold;
            color: #e09015;
            margin-left: 4px;
          }
        }
      }
    }
  }

  .loadMoreButton {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50px;
    border: 1px solid #ccc;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      background-color: #ccc;
    }
  }
}
</style>