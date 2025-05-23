import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
  

export default function ShopPagination() {
  return (
    <Pagination>
    <PaginationContent className="text-neutral-500">
      <PaginationItem>
        <PaginationPrevious href="#" className="text-neutral-500"/>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#" className="text-neutral-500">1</PaginationLink>
      </PaginationItem>
      {/* <PaginationItem>
        <PaginationEllipsis />
      </PaginationItem> */}
      <PaginationItem>
        <PaginationNext href="#" className="text-neutral-500"/>
      </PaginationItem>
    </PaginationContent>
  </Pagination>
  
  )
}
