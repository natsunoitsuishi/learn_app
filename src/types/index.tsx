interface Category {
    id: number
    name: string
}

interface User {
    id: number
    username: string
    nickname: string
    avatar: string
    company: string
}

export interface CourseItem {
    id: number
    name: string
    image: string
    categoryId: number
    chaptersCount: number
    introductory: number
    likeCount: number
    recommended: number
    createdAt: string
    updatedAt: string
    userId: number
    category: Category
    user: User
}

interface Pagination {
    limit: number
    page: number
    total: number
}

export interface SearchResponse {
    recommendedCourses: CourseItem[],
    likesCourses: CourseItem[],
    introductoryCourses: CourseItem[],
    pagination: Pagination
}
