/**
 *
 * @param arrowId
 */
export function changeBottomByContinents (arrowId) {
  bottomItemCount = 0
  clearInterval(setTimerIdBottom)
  bottomContainerElements.innerHTML = ''
  if (arrowId === 'down-arrow') {
    continentArrow.src = '/Assets/HTML&CSS/GeneralImages&Icons/' + 'arrow-up' + '.svg'
    continentArrow.id = 'up-arrow'
    continentWiseList = sortCitiesByContinent(continentWiseList).reverse()
  } else {
    continentArrow.src = '/Assets/HTML&CSS/GeneralImages&Icons/' + 'arrow-down' + '.svg'
    continentArrow.id = 'down-arrow'
    continentWiseList = sortCitiesByContinent(continentWiseList)
  }
  changeBottomSegment(continentWiseList)
}
