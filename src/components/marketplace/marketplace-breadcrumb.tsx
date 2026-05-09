import { Link } from '@tanstack/react-router';

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
      type: 'collections';
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
      type: 'authors';
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
            <Link to={"/marketplace" as any}>Marketplace</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator />

        {props.type === 'collections' && (
          <BreadcrumbItem>
            <BreadcrumbPage>Collections</BreadcrumbPage>
          </BreadcrumbItem>
        )}

        {props.type === 'collection' && (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={"/marketplace/collections" as any}>Collections</Link>
              </BreadcrumbLink>
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
                <Link to={`/marketplace?type=${normalizeTypeForFilter(props.itemType)}` as any}>
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

        {props.type === 'authors' && (
          <BreadcrumbItem>
            <BreadcrumbPage>Authors</BreadcrumbPage>
          </BreadcrumbItem>
        )}

        {props.type === 'author' && (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={"/marketplace/authors" as any}>Authors</Link>
              </BreadcrumbLink>
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
