import screenContainerWeb from "react-native-screens/src/components/ScreenContainer.web";

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

export interface Response {
    recommendedCourses: CourseItem[],
    likesCourses: CourseItem[],
    introductoryCourses: CourseItem[],
    pagination: Pagination
}

export interface ArticleItem {
    id: number,
    createdAt: string,
    updatedAt: string,
    title: string
}
export interface ArticleResponse {
    articles: ArticleItem[],
    pagination: Pagination
}