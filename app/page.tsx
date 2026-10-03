import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Section, SectionHead } from "@/components/ui/Section";
import { Accordion } from "@/components/ui/Accordion";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { TrustStrip } from "@/components/TrustStrip";
import { FeatureSections } from "@/components/FeatureSections";
import { StatsBand } from "@/components/StatsBand";
import { StoryCards } from "@/components/StoryCards";
import { TileGrid } from "@/components/TileGrid";
import { NewsletterForm } from "@/components/NewsletterForm";
import { getFeatured } from "@/data/products";

const faqs = [
  {
    q: "How long does shipping take?",
    a: "UK orders leave the studio within 48 hours and arrive in two to three working days. Europe takes about a week. Anything made to order takes longer, and we will tell you how long before you pay.",
  },
  {
    q: "Can I commission something custom?",
    a: "Yes. Send a reference photo through the Custom Orders page. We reply within two days with a price and a realistic date. We will say no if it is not something we can crochet well.",
  },
  {
    q: "What is your returns policy?",
    a: "Thirty days, unused, in the packaging it arrived in. Custom commissions are the exception, since they are made for you specifically.",
  },
  {
    q: "What materials do you use?",
    a: "Cotton and acrylic yarn, mostly. Flowers use wire armatures, bags use cotton canvas, and everything is stitched with a tapestry needle rather than glued.",
  },
  {
    q: "How do I wash crochet goods?",
    a: "Cold hand wash, reshape, and dry flat. Machine washing on a wool cycle works for amigurumi but will felt a bag. Dated flowers need nothing at all.",
  },
];

export default function HomePage() {
  const featured = getFeatured().slice(0, 4);

  return (
    <>
      {/* Hero */}
      <Section className="pt-14 pb-16 md:pt-20 md:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
          <Reveal>
            <p className="eyebrow">Made in small batches</p>
            <h1 className="heading-xl mt-5">
              Crocheted goods, one hook at a time.
            </h1>
            <p className="prose-measure mt-6 text-lg text-text/70">
              Bags, dried flowers, amigurumi and keychains, made by hand in a back
              room in Bristol. Nothing here is moulded, and the stitch count varies
              a little, which is the point.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button href="/shop" size="lg">
                Shop now
                <ArrowRight size={17} />
              </Button>
              <Link
                href="/collections/custom"
                className="focus-ring inline-flex items-center gap-1.5 rounded-focus font-medium underline-offset-4 hover:underline"
              >
                Commission something
              </Link>
            </div>
          </Reveal>

          <Reveal index={1}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-subtle shadow-card">
              <Image
                src="https://picsum.photos/seed/hero-studio/1000/1250"
                alt="A crochet bag and dried flowers on a studio bench"
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </Section>

      <TrustStrip />

      {/* Featured products */}
      <Section>
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            eyebrow="Featured"
            title="This month's batches"
            lede="The pieces that left the studio fastest this month."
          />
          <Button href="/shop" variant="secondary">
            All products
          </Button>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p, i) => (
            <Reveal key={p.id} index={i}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Alternating feature sections */}
      <Section tone="subtle">
        <Reveal>
          <SectionHead
            eyebrow="Why it costs what it costs"
            title="Slow, small, and made to be kept"
          />
        </Reveal>
        <FeatureSections />
      </Section>

      {/* Stats */}
      <Section tone="inverse">
        <StatsBand />
      </Section>

      {/* Story cards */}
      <Section>
        <Reveal>
          <SectionHead
            eyebrow="Studio stories"
            title="Where these end up"
            lede="A few pieces, and the people who bought them."
          />
        </Reveal>
        <div className="mt-12">
          <StoryCards />
        </div>
      </Section>

      {/* Tile grid */}
      <Section tone="subtle">
        <Reveal>
          <SectionHead
            eyebrow="Shop by category"
            title="Six things we make"
            align="center"
          />
        </Reveal>
        <div className="mt-12">
          <TileGrid />
        </div>
      </Section>

      {/* Newsletter */}
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Newsletter</p>
          <h2 className="heading-lg mt-3">Tell us when the next batch lands</h2>
          <p className="mx-auto prose-measure mt-4 text-text/70">
            One email a month, usually a Tuesday, usually about stock.
          </p>
          <div className="mt-8">
            <NewsletterForm />
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section tone="subtle">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.4fr]">
          <Reveal>
            <SectionHead
              eyebrow="Questions"
              title="The five we get most"
              lede="Anything else, ask and we will answer properly."
            />
            <Link
              href="/shop"
              className="focus-ring mt-6 inline-flex items-center gap-1.5 rounded-focus font-medium underline-offset-4 hover:underline"
            >
              Read the care notes
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </Reveal>
          <Reveal index={1}>
            <Accordion items={faqs} />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
