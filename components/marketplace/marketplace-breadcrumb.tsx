import Link from 'next/link';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { getMarketplaceTypeLabel, normalizeTypeForFilter } from '@/lib/marketplace';

type BreadcrumbProps =
  | {
      type: 'collection';
      collectionName: string;
    }
  | {
      type: 'item';
      itemType: string;
      itemName: string;
    }
  | {
      type: 'author';
      authorName: string;
    }
  | {
      type: 'category';
      categoryType: string;
    }
  | {
      type: 'create';
    };

export function MarketplaceBreadcrumb(props: BreadcrumbProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/marketplace">Marketplace</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        {props.type === 'collection' && (
          <>
            <BreadcrumbItem>
              <BreadcrumbPage>Collections</BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{props.collectionName}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}

        {props.type === 'item' && (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/marketplace?type=${normalizeTypeForFilter(props.itemType)}`}>
                  {getMarketplaceTypeLabel(props.itemType)}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{props.itemName}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}

        {props.type === 'author' && (
          <>
            <BreadcrumbItem>
              <BreadcrumbPage>Authors</BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{props.authorName}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}

        {props.type === 'category' && (
          <BreadcrumbItem>
            <BreadcrumbPage>{getMarketplaceTypeLabel(props.categoryType)}</BreadcrumbPage>
          </BreadcrumbItem>
        )}

        {props.type === 'create' && (
          <BreadcrumbItem>
            <BreadcrumbPage>Create Item</BreadcrumbPage>
          </BreadcrumbItem>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
