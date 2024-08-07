/**
 * 좌표 값에 해당하는 구 주소와 도로명 주소 정보를 요청한다.
 * 도로명 주소는 좌표에 따라서 표출되지 않을 수 있다.
 *
 * @param {number} lat
 * @param {number} lng
 *
 * @returns {string} location 구주소 + 도로명주소(표기 안될 수 있음)
 */
function convertCoordinatesToAddress(lat, lng) {
  const geocoder = new kakao.maps.services.Geocoder()
  const coord = new kakao.maps.LatLng(lat, lng)

  geocoder.coord2Address(coord.getLng(), coord.getLat(), function (result, status) {
    if (status === kakao.maps.services.Status.OK) {
      console.log('좌표변환!')
      return result[0].address.address_name
    }
  })
}
