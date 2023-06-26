<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-start text-center fill-height">
      <v-alert v-if="alertMessage" type="error" dismissible>
        {{ alertMessage }}
      </v-alert>

      <v-alert v-if="successMessage" type="success" dismissible>
        {{ successMessage }}
      </v-alert>

      <div class="py-3" />

      <h3 class="text-h4 font-weight-bold">はじめに、データの入力をしましょう</h3>

      <div class="py-7" />

      <v-row class="d-flex align-center justify-center">
        <v-col cols="4">
          <v-select v-model="inputJob" :items="jobList" item-title="text" item-value="value" :rules="selectRules" label="ジョブ" outlined />
        </v-col>
        <v-col cols="4">
          <v-text-field v-model="userName" :rules="inputRules" label="キャラクター名" outlined />
        </v-col>
      </v-row>

      <v-row class="d-flex align-center justify-center">
        <v-col cols="auto">
          <v-btn :disabled="Object.keys(items).length >= 10" color="primary" min-width="228" size="x-large" variant="flat" @click="addItem">
            <v-icon icon="mdi-plus" size="large" start />
            データ追加
          </v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn :disabled="Object.keys(items).length === 0" color="success" min-width="228" size="x-large" variant="flat" @click="createMatch">
            <v-icon icon="mdi-sword-cross" size="large" start />
            対戦を開始
          </v-btn>
        </v-col>
      </v-row>

      <v-table class="elevation-1">
        <thead>
          <tr>
            <th class="text-center">
            </th>
            <th class="text-center">
              ジョブ
            </th>
            <th class="text-center">
              キャラクター名
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, key, index) in Object.entries(items)" :key="index">
            <td>
              <v-btn color="error" icon variant="flat" @click="deleteItem(key)">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </td>
            <td>{{ item[1].result[0].job }}</td>
            <td>{{ key }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-responsive>
  </v-container>
</template>

<script setup>
import { db } from '@/firebase/firebase.js';
import { addDoc, collection } from 'firebase/firestore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const items = ref({});
const userName = ref('');
const inputJob = ref(null);
const alertMessage = ref(null);
const successMessage = ref(null);

const jobList = ref([
  { text: '選択してください', value: null },
  { text: 'ナイト', value: 'PLD' },
  { text: '戦士', value: 'WAR' },
  { text: '暗黒騎士', value: 'DRK' },
  { text: 'ガンブレイカー', value: 'GNB' },
  { text: '白魔道士', value: 'WHM' },
  { text: '学者', value: 'SCH' },
  { text: '占星術師', value: 'AST' },
  { text: '賢者', value: 'SGE' },
  { text: 'モンク', value: 'MNK' },
  { text: '竜騎士', value: 'DRG' },
  { text: '忍者', value: 'NIN' },
  { text: '侍', value: 'SAM' },
  { text: 'リーパー', value: 'RPR' },
  { text: '吟遊詩人', value: 'BRD' },
  { text: '機工士', value: 'MCH' },
  { text: '踊り子', value: 'DNC' },
  { text: '召喚士', value: 'SMN' },
  { text: '赤魔道士', value: 'RDM' },
  { text: '黒魔道士', value: 'BLM' },
]);

const inputRules = ref([
  v => !!v || 'キャラクター名は必須です。',
  v => (v && v.length <= 20) || 'キャラクター名は20文字以内で入力してください。',
]);

const selectRules = ref([
  v => !!v || '選択は必須です。',
]);

const createMatch = async () => {
  try {
    const docRef = await addDoc(collection(db, 'match'), items.value);
    router.push(`/match/${docRef.id}`);
  } catch (e) {
    alertMessage.value = 'エラーが発生しました。: ' + e;
  }
};

const addItem = () => {
  if (Object.keys(items.value).length < 10 && userName.value && inputJob.value) {
    items.value[userName.value] = {
      job: inputJob.value,
    };

    userName.value = '';
    inputJob.value = null;
    alertMessage.value = null;
  } else {
    alertMessage.value = '入力が不完全か、すでに10人以上追加されています。';
  }
};

const deleteItem = (key) => {
  delete items.value[key];
};
</script>
