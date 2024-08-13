import axios from 'axios'

export const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: {
    'Content-Type': 'application.json',
  },
})

/**
 * balloon들의 List를 가져오는 함수
 *
 * @returns {object} balloons
 */
export const getballoonListData = () => {
  //   return instance.get('/balloons')

  return mockData.data
}

const mockData = {
  success: true,
  data: [
    {
      id: '0e68778b-d19b-4182-a419-7eb9be5f933b',
      latitude: 37.27943075229118,
      longitude: 127.01763998406159,
      address: '경기도 수원시 팔달구 정조로800번길',
      detection_image: 'detection_image2',
      detection_time: '2024-08-08T09:00:00',
      processing_image: 'processing_image2',
      processing_time: '2024-08-10T14:00:00',
      processing_state: '처리 완료',
      description: '처리 완료',
    },
    {
      id: '866795f1-f41a-480b-ab69-79987fc5a464',
      latitude: 37.55915668706214,
      longitude: 126.92536526611102,
      address: '서울특별시 마포구 양화로23길 16',
      detection_image: 'detection_image3',
      detection_time: '2024-08-09T09:00:00',
      processing_image: null,
      processing_time: null,
      processing_state: '발견',
      description: null,
    },
    {
      id: 'b8def4a6-eb6d-41e5-ac82-9c43327da740',
      latitude: 37.27943075229118,
      longitude: 127.01763998406159,
      address: '경기도 수원시 팔달구 정조로800번길',
      detection_image: 'detection_image1',
      detection_time: '2024-08-08T09:00:00',
      processing_image: null,
      processing_time: null,
      processing_state: '발견',
      description: null,
    },
    {
      id: '4327970c-f9b3-4ff7-84d1-f4de7cf2bac2',
      latitude: 35.20618517638034,
      longitude: 129.07944301057026,
      address: '부산광역시 동래구 명륜로129번다길',
      detection_image: 'detection_image2',
      detection_time: '2024-08-10T09:00:00',
      processing_image: 'processing_image2',
      processing_time: '2024-08-10T14:56:00',
      processing_state: '처리 완료',
      description: null,
    },
    {
      id: '548dc8d4-006d-4463-b5ec-ce1e942d809b',
      latitude: 37.55518388656961,
      longitude: 126.92926237742505,
      address: '서울특별시 마포구 와우산로29길 4-42',
      detection_image: 'detection_image1',
      detection_time: '2024-08-08T13:33:00',
      processing_image: null,
      processing_time: null,
      processing_state: '발견',
      description: null,
    },
    {
      id: 'c2f52805-4034-4634-8a81-61a98ea100e8',
      latitude: 37.561110808242056,
      longitude: 126.9831268386891,
      address: '4층, 52 명동2길 중구 서울특별시',
      detection_image: 'detection_image3',
      detection_time: '2024-08-09T09:00:00',
      processing_image: null,
      processing_time: null,
      processing_state: '발견',
      description: '단순 쓰레기',
    },
  ],
  error: null,
}
