import keystaticConfig, { contentBaseUrl } from "@/keystatic.config";
import { createReader } from "@keystatic/core/reader";
import Sidebar from "./Sidebar";
import AccountButtons from "./account-buttons";
import Footer from "./footer";
import {
  type KeystaticNavigationFile,
  type KeystaticPage,
  assembleNavData,
} from "./lib";

export default async function Layout({
  slug,
  title,
  children,
}: {
  slug: string;
  title: string;
  children: React.ReactNode;
}) {
  const reader = createReader(contentBaseUrl, keystaticConfig);
  const navigation = await reader.singletons.navigation.read();
  const pages = await reader.collections.pages.all();

  if (!navigation) {
    throw new Error("Navigation couldn't be loaded from Keystatic");
  }

  const nav = assembleNavData(
    navigation as KeystaticNavigationFile,
    pages as KeystaticPage[],
  );

  if ("errors" in nav) {
    throw new Error(nav.errors.join("\n"));
  }

  return (
    <div className="grid grid-rows-[max-content,1fr,max-content] md:flex min-h-screen">
      <Sidebar slug={slug} nav={nav} />

      <div className="p-4 pb-8 md:p-8 md:pt-12 md:pb-24 flex-1 overflow-hidden">
        <div className="max-w-screen-sm mx-auto">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-8">
            {title}
          </h1>

          <div
            className="mt-4 prose prose-lg prose-h2:text-2xl prose-h3:text-xl prose-img:border-[50px] prose-img:border-gray-100 prose-img:outline prose-img:outline-1 prose-img:outline-gray-300 prose-img:mx-auto [&_td>p]:!my-0 [&_th>p]:!my-0 glossary:prose-a:after:mask-[url('/book.svg')] glossary:prose-a:notable-link app-link:prose-a:after:mask-[url('/icon.svg')] app-link:prose-a:notable-link
            pricing:prose-a:after:mask-[url('/dollar.svg')] pricing:prose-a:notable-link [&_a:hover]:bg-[color-mix(in_srgb,currentColor_10%,transparent)]
          "
          >
            {children}
          </div>
        </div>
      </div>

      <div className="md:hidden bg-gray-100 p-4">
        <Footer />
      </div>

      <AccountButtons />
    </div>
  );
}
