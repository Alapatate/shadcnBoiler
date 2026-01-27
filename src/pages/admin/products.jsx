import React, { useEffect, useState } from 'react'
import { productsServices } from '@/lib/services/productsServices'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { StarIcon } from 'lucide-react'
import { FilterSelector } from '@/components/custom/filterSelector'
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export const ProductsAdminPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [chartData, setChartData] = useState([]);

  const chartConfig = {
    count: {
      label: "Count",
      color: "var(--chart-2)",
    },
  }



  function countProductsBytag(products, tag) {
    return products.filter(product => product.tags?.includes(tag)).length
  }

  function createTagsTable(products) {
    let tags = []
    products.forEach(product => {
      product.tags.forEach(tag => {
        if (!tags.includes(tag)) {
          tags.push(tag)
        }
      })
    })
    return tags
  }

  function filterProductsByTags(products, SelectedTags) {
    if (SelectedTags.length === 0) {
      return products
    }
    return products.filter(product =>
      SelectedTags.some(tag => product.tags?.includes(tag))
    )
  }

  useEffect(() => {
    try {
      productsServices.getAllProducts().then(data => {
        setProducts(
          data.products.map(product => {
            const userRating = product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length;

            return {
              ...product,
              userRating
            }
          })
        );
        setTags(createTagsTable(data.products))
      }
      );
    }
    catch (error) {
      console.log(error);
    }
  }, []);



  useEffect(() => {
    setFilteredProducts(products)
  }, [products]);




  useEffect(() => {
    setFilteredProducts(filterProductsByTags(products, selectedTags))


    if (selectedTags.length > 0) {
      setChartData(selectedTags.map(tag => ({
        tag,
        count: countProductsBytag(products, tag)
      })))
    } else {
      setChartData(tags.map(tag => ({
        tag,
        count: countProductsBytag(products, tag)
      })))
    }
  }, [selectedTags, tags]);


  console.log(chartData);


  return (
    <div className='flex flex-col  gap-4'>
      <FilterSelector tags={tags} placeholder="Filter by tag" setFilters={setSelectedTags} />
      <ChartContainer config={chartConfig} className='w-[80vw] h-[20vh]'>
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="tag"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dashed" />}
          />
          <Bar dataKey="count" fill="var(--color-count)" radius={4} />
        </BarChart>
      </ChartContainer>
      <ScrollArea className='flex flex-col h-[60vh] w-[80vw] gap-4 rounded-md'>
        {filteredProducts.map((product) => (
          <div key={product.id} className='flex justify-between h-full w-full mb-4 p-4  border rounded-md   gap-4'>
            <h1>{product.title}</h1>
            <div className='flex  gap-2'>
              <Badge >
                <span>User</span>
                {product.userRating.toFixed(2)}
                <StarIcon className='w-4 h-4' />
              </Badge>
              <Badge >
                <span>Admin</span>
                {product.rating.toFixed(2)}
                <StarIcon className='w-4 h-4' />
              </Badge>
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  )
}
