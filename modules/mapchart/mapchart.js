import { select, geoMercator, geoPath, selectAll } from 'd3';
import { feature } from 'topojson';
import { generateHeadBlock, handleFilter, handleMouseOver, handleMouseOut } from './util';
export const colors = ['#FAA51A', '#F15E6B', 'pink', 'red', 'purple']
export const projection = geoMercator().scale(6000).center([5.116667, 52.17])

/**
 * Map chart
 * @see {@link https://vizhub.com/sreen020/f29bf760c4ef40efaa0343794f63e1d0?edit=files&file=index.js} - used reference
 * @param {Object} data - dataset
 * @param {String} id - element id for chart
 * @param {String} title - chart title
 */
export function mapchart(allSpaces, disabledSpaces, mapData, id, title) {
  const path = geoPath().projection(projection)
  const width = 500
  const height = 500

  generateHeadBlock(id, title)

  const map = select("#" + id)
    .append("svg")
    .attr('viewBox', [250, 0, width, height])
    .attr('width', 'auto')
    .attr('height', 'auto')
    .attr('class', 'map')
    .style('background-color', 'transparent ')

  const g = map.append('g')
  g.append('g')
    .attr('fill', 'transparent')
    .attr('stroke', 'black')
    .style('stroke-width', '.5px')
    .selectAll('path')
    .data(feature(mapData, mapData.objects.gemeente_2020).features)
    .join('path')
    .attr('d', path);

  map.selectAll('circle')
    .data(allSpaces)
    .enter()
    .append('circle')
    .attr('cx', d => projection([d.location.longitude, d.location.latitude])[0])
    .attr('cy', d => projection([d.location.longitude, d.location.latitude])[1])
    .attr('r', '4px')
    .attr('stroke', 'black')
    .style('stroke-width', '.5px')
    .attr('fill', '#FF333D')
    .on('mouseover', handleMouseOver)
    .on('mouseout', handleMouseOut)

  selectAll('input[name="radiogroup"').on('change', d => handleFilter(d, allSpaces, disabledSpaces))
}