import { PostWithData } from "@/types";
import { prisma } from "..";

export const fetchPostBySlug = async( slug: string ): Promise<PostWithData[]> => {
    return prisma.post.findMany({
        where: {
            topic: {
                slug: slug
            }
        },
        include: {
            topic: {
                select: {
                    slug: true
                }
            },
            _count: {
                select: {
                    comments: true
                }
            },
            user: {
                select: {
                    name: true,
                }
            }
        }
    })
};

export const fetchTopPosts = async(): Promise<PostWithData[]> => {
    return prisma.post.findMany({
        orderBy: [
            {
                comments: { _count: "desc" }
            }
        ],
        include: {
            topic: {
                select: {
                    slug: true
                }
            },
            _count: {
                select: {
                    comments: true
                }
            },
            user: {
                select: {
                    name: true,
                }
            }
        },
        take: 5
    });
}