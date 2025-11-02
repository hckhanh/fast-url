import Link from "next/link";

export default function HomePage() {
	return (
		<div className="flex flex-col justify-center text-center flex-1 px-4">
			<div className="max-w-4xl mx-auto py-12">
				<h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
					fast-url
				</h1>
				<p className="text-xl text-muted-foreground mb-8">
					Build correct URLs easily. A fast, type-safe, lightweight URL building
					library for JavaScript and TypeScript.
				</p>
				<div className="flex gap-4 justify-center mb-12">
					<Link
						href="/docs"
						className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
					>
						Get Started
					</Link>
					<Link
						href="https://github.com/hckhanh/fast-url"
						className="px-6 py-3 border border-border rounded-lg font-medium hover:bg-accent transition-colors"
						target="_blank"
						rel="noopener noreferrer"
					>
						GitHub
					</Link>
				</div>
				<div className="bg-card border border-border rounded-lg p-6 text-left">
					<pre className="text-sm overflow-x-auto">
						<code>{`import urlcat from 'fast-url';

// Path parameters
urlcat('https://api.example.com', '/users/:id', { id: 123 });
// → 'https://api.example.com/users/123'

// Query parameters  
urlcat('https://api.example.com', '/users', { limit: 10, offset: 20 });
// → 'https://api.example.com/users?limit=10&offset=20'`}</code>
					</pre>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
					<div className="p-6 border border-border rounded-lg">
						<h3 className="font-bold mb-2">⚡ High Performance</h3>
						<p className="text-sm text-muted-foreground">
							5-20% faster than the original implementation with optimized query
							string encoding
						</p>
					</div>
					<div className="p-6 border border-border rounded-lg">
						<h3 className="font-bold mb-2">🔒 Type Safe</h3>
						<p className="text-sm text-muted-foreground">
							Full TypeScript support with comprehensive type definitions out of
							the box
						</p>
					</div>
					<div className="p-6 border border-border rounded-lg">
						<h3 className="font-bold mb-2">🪶 Lightweight</h3>
						<p className="text-sm text-muted-foreground">
							Minimal bundle size with only one dependency - perfect for
							performance-critical apps
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
