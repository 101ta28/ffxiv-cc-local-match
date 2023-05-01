<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-start text-center fill-height">
      <h3 class="text-h4 font-weight-bold">はじめに、データの入力をしましょう</h3>

      <div class="py-7" />

      <v-row class="d-flex align-center justify-center">
        <v-col cols="4">
          <v-text-field label="ジョブ" outlined />
        </v-col>
        <v-col cols="4">
          <v-text-field label="キャラクター名" outlined />
        </v-col>
        <v-col cols="4">
          <v-text-field label="階級" outlined />
        </v-col>
      </v-row>
      <!-- データ追加ボタンを作り、押すと下にテーブルを表示させる -->
      <v-row class="d-flex align-center justify-center">
        <v-btn color="primary" min-width="228" size="x-large" variant="flat">
          <v-icon icon="mdi-plus" size="large" start />

          データ追加
        </v-btn>
      </v-row>
      <v-table class="elevation-1">
        <thead>
          <tr>
            <th class="text-center">
              チーム
            </th>
            <th class="text-center">
              ジョブ
            </th>
            <th class="text-center">
              キャラクター名
            </th>
            <th class="text-center">
              ホームワールド
            </th>
            <th class="text-center">
              階級
            </th>
            <th class="text-center">
              K
            </th>
            <th class="text-center">
              D
            </th>
            <th class="text-center">
              A
            </th>
            <th class="text-center">
              勝ち点
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, key) in Object.entries(items)" :key="key">
            <td>{{ item[1].result[0].team }}</td>
            <td>{{ item[1].result[0].job }}</td>
            <td>{{ item[0] }}</td>
            <td>{{ item[1].world }}</td>
            <td>{{ item[1].rank }}</td>
            <td>{{ item[1].result[0].k }}</td>
            <td>{{ item[1].result[0].d }}</td>
            <td>{{ item[1].result[0].a }}</td>
            <!-- <td>{{ item[1]['winning point'] }}</td> -->
            <!-- 左と右に-, +ボタンをおく -->
            <td>
              <v-btn color="primary" icon size="x-small">
                <v-icon>mdi-minus</v-icon>
              </v-btn>
              {{ item[1]['winning point'] }}
              <v-btn color="primary" icon size="x-small">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-responsive>
  </v-container>
</template>

<script setup>
import { computed, ref } from 'vue';

const userName = ref('');

const itemTemplate = computed(() => {
  return {
    [userName.value]: {
      rank: '',
      world: '',
      'winning point': 0,
      result: [
        {
          job: '',
          team: '',
          k: '',
          d: '',
          a: '',
        },
      ],
    },
  };
});

const items = ref({
  'Ayuto 1': {
    rank: 'ブロンズ',
    world: 'Ridill',
    'winning point': 1,
    result: [
      {
        job: 'BLM',
        team: 'astra',
        k: '1',
        d: '1',
        a: '4',
      },
      {
        job: 'NIN',
        team: 'umbra',
        k: '3',
        d: '2',
        a: '3',
      },
    ],
  },
  'Ayuto 2': {
    rank: 'ブロンズ',
    world: 'Ridill',
    'winning point': 1,
    result: [
      {
        job: 'BLM',
        team: 'umbra',
        k: '1',
        d: '1',
        a: '4',
      },
      {
        job: 'BLM',
        team: 'astra',
        k: '3',
        d: '2',
        a: '3',
      },
    ],
  },
});

// ボタンを押したらitemTemplateをitemsに追加する
const addItem = () => {
  items.value = { ...items.value, ...itemTemplate.value };
};
</script>
