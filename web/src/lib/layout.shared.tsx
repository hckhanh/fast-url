import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

export function baseOptions(): BaseLayoutProps {
	return {
		nav: {
			title: "fast-url",
		},
		links: [
			{
				text: "Documentation",
				url: "/docs",
				active: "nested-url",
			},
			{
				text: "GitHub",
				url: "https://github.com/hckhanh/fast-url",
				external: true,
			},
		],
	};
}
