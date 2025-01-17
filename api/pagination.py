from rest_framework.pagination import PageNumberPagination


class ReviewsPageNumberPagination(PageNumberPagination):
    page_size_query_param = 'page_size'
    page_query_param = 'page'
    max_page_size = 2
